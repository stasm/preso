const print = require('./print');
const parse = require('./parse');

module.exports = format;

class Writer {
  constructor(value = null, errs = []) {
    this.value = value;
    this.errs = errs;
  }

  flatMap(fn) {
    const {value, errs} = fn(this.value);
    return new Writer(value, [...this.errs, ...errs]);
  }
}

function unit(val) {
  return new Writer(val, []);
}

function fail(val, err) {
  return new Writer(val, [err]);
}

function wield(iter) {
  return function step(resume) {
    const {value, done} = iter.next(resume);
    return done ? value : value.flatMap(step);
  }();
}

// ----------------------------------------------------------------------------

const filters = {
  toUpper(str) {
    if (typeof str !== 'string') {
      return fail(str, `Invalid argument to toUpper: ${typeof str}`);
    }

    return unit(str.toUpperCase());
  },
  toMonth(date) {
    if (!(date instanceof Date)) {
      return fail(date, `Invalid argument to toMonth: ${typeof date}`);
    }

    return unit(date.toLocaleString('en-US', { month: 'long' }));
  }
};

function Reference(args, {name}) {
  return name in args ?
    unit(args[name]) :
    fail(name, `Unknown reference: ${name}`);
}

function* Filter(args, {name, arg}) {
  const val = yield* Value(args, arg);
  const filter = filters[name];

  if (!filter) {
    return yield fail(val, `Unknown filter: ${name}`);
  }

  return yield filter(val);
}

function* Value(args, expr) {
  switch (expr.type) {
    case 'Text':
      return yield unit(expr.value);
    case 'Reference':
      return yield Reference(args, expr);
    case 'Filter':
      return yield* Filter(args, expr);
  }
}

function* interpolate(str, args) {
  let result = yield unit('');
  for (const part of parse(str)) {
    result += yield* Value(args, part);
  }
  return unit(result);
}

function format(str, args) {
  return wield(interpolate(str, args));
}

const { value, errs } = format(
  '{ city } in { date | toMonth | toUpper }',
  { city: 'Warsaw', date: new Date() }
);

print(value);
console.dir(errs);
