const parse = require('./parse');

module.exports = interpolate;

const filters = {
  toUpper(str) {
    return str.toUpperCase();
  },
  toLower(str) {
    return str.toLowerCase();
  }
};

function Reference(args, {name}) {
  return args[name];
}

function Filter(args, {name, arg}) {
  const val = Value(args, arg);
  return filters[name](val);
}

function Value(args, expr) {
  switch (expr.type) {
    case 'Text':
      return expr.value;
    case 'Reference':
      return Reference(args, expr);
    case 'Filter':
      return Filter(args, expr);
  }
}

function interpolate(str, args) {
  let result = '';
  for (const part of parse(str)) {
    result += Value(args, part);
  }
  return result;
}

// const result = interpolate('aaa {b | toUpper } ccc {d} eee', {
//   b: 'Abc',
//   d: 'ddd',
// });

// console.log(result);
