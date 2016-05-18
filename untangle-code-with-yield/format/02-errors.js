const print = require('./print');
const parse = require('./parse');

module.exports = interpolate;

const filters = {
  toUpper(str) {
    return typeof str === 'string' ?
      [str.toUpperCase(), []] :
      [str, [`Invalid argument to toUpperCase: ${typeof str}`]];
  },
  toMonth(date) {
    return date instanceof Date ?
      [date.toLocaleString('en-US', { month: 'long' }), []] :
      [date, [`Invalid argument to toMonth: ${typeof date}`]];
  }
};

function Reference(args, {name}) {
  return name in args ?
    [args[name], []] :
    [name, [`Unknown reference: ${name}`]];
}

function Filter(args, {name, arg}) {
  const [val, errs] = Value(args, arg);
  const filter = filters[name];

  if (!filter) {
    return [val, [...errs, `Unknown filter: ${name}`]];
  }

  const [val2, errs2] = filter(val);
  return [val2, [...errs, ...errs2]];
}

function Value(args, expr) {
  switch (expr.type) {
    case 'Text':
      return [expr.value, []];
    case 'Reference':
      return Reference(args, expr);
    case 'Filter':
      return Filter(args, expr);
  }
}

function interpolate(str, args) {
  let result = '';
  let errs = [];

  for (const part of parse(str)) {
    const [val, valErrs] = Value(args, part);
    result += val;
    errs = [...errs, ...valErrs];
  }
  return [result, errs]
}

const [result, errors] = interpolate(
  '{ city } in { date | toMonth | toUpper }',
  { city: 'Warsaw', date: new Date() }
);

print(result);
console.dir(errors);
