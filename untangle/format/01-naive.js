const print = require('./print');// {{{
const parse = require('./parse');

module.exports = interpolate;// }}}

const filters = {// {{{
  toUpper(str) {
    return str.toUpperCase();
  },
  toWeekDay(date) {
    return date.toLocaleString('en-US', {
      weekday: 'long'
    });
  }
};// }}}

function Value(args, expr) {// {{{
  switch (expr.type) {
    case 'Text':
      return expr.value;
    case 'Reference':
      return Reference(args, expr);
    case 'Filter':
      return Filter(args, expr);
  }
}

function Reference(args, {name}) {
  return args[name];
}

function Filter(args, {name, arg}) {
  const val = Value(args, arg);
  return filters[name](val);
}// }}}

function interpolate(str, args) {// {{{
  let result = '';
  for (const part of parse(str)) {
    result += Value(args, part);
  }
  return result;
}// }}}

const result = interpolate(`
  It's {date | toWeekDay | toUpper}
  and we're in {city}.
`, { date: new Date(), city: 'Warsaw' }
);

print(result);
