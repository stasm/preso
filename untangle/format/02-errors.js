const print = require('./print');// {{{
const parse = require('./parse');

module.exports = interpolate;// }}}

const filters = {// {{{
  toUpper(str) {
    return typeof str === 'string' ?
      [str.toUpperCase(), []] :
      [str, [`Invalid argument to toUpperCase: ${typeof str}`]];
  },
  toWeekDay(date) {
    return date instanceof Date ?
      [date.toLocaleString('en-US', { weekday: 'long' }), []] :
      [date, [`Invalid argument to toMonth: ${typeof date}`]];
  }
};// }}}

function Value(args, expr) {// {{{
  switch (expr.type) {
    case 'Text':
      return [expr.value, []];
    case 'Reference':
      return Reference(args, expr);
    case 'Filter':
      return Filter(args, expr);
  }
}

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
}// }}}

function interpolate(str, args) {// {{{
  let result = '';
  let errs = [];

  for (const part of parse(str)) {
    const [val, valErrs] = Value(args, part);
    result += val;
    errs = [...errs, ...valErrs];
  }
  return [result, errs]
}// }}}

const [result, errors] = interpolate(`
  It's {date | toWeekDay | toUpper}
  and we're in {city}.
`, { date: new Date(), city: 'Warsaw' }
);

print(result);
console.dir(errors);
