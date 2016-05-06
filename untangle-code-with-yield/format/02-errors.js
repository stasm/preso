const parse = require('./parse');

module.exports = interpolate;

const filters = {
  toUpper(str) {
    return typeof str === 'string' ?
      [str.toUpperCase(), []] :
      [str, [`Invalid argument to toUpperCase: ${typeof str}`]];
  },
  toLower(str) {
    return typeof str === 'string' ?
      [str.toLowerCase(), []] :
      [str, [`Invalid argument to toLowerCase: ${typeof str}`]];
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

// const result = interpolate('aaa {b | toUpper } ccc {d} eee', {
//   b: 'Abc',
//   d: 'ddd',
// });

// console.log(result);
