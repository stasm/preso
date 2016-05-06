const parse = require('./parse');

module.exports = format;

class Writer {
  constructor(value = null, logs = []) {
    this.value = value;
    this.logs = logs;
  }

  flatMap(fn) {
    const {value, logs} = fn(this.value);
    return new Writer(value, [...this.logs, ...logs]);
  }
}

function unit(val) {
  return new Writer(val, []);
}

function fail(val, log) {
  return new Writer(val, [log]);
}

function zzz(iter) {
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
  toLower(str) {
    if (typeof str !== 'string') {
      return fail(str, `Invalid argument to toLower: ${typeof str}`);
    }

    return unit(str.toLowerCase());
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
  return zzz(interpolate(str, args));
}

// const result = format('aaa {b|toUpper|xxx} ccc {d|toUpper} eee', {
//   b: 'bBb',
//   d: 5,
// });

// console.log(result);
