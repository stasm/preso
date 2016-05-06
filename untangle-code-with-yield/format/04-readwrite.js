const parse = require('./parse');

module.exports = format;

class RW {
  constructor(fn) {
    this.fn = fn;
  }

  run(ctx) {
    return this.fn(ctx);
  }

  flatMap(fn) {
    return new RW(ctx => {
      const [cur, curErrs] = this.run(ctx);
      const [val, valErrs] = fn(cur).run(ctx);
      return [val, [...curErrs, ...valErrs]];
    });
  }
}

RW.ask = function() {
  return new RW(ctx => [ctx, []]);
}

RW.tell = function(log) {
  return new RW(() => [null, [log]]);
}

RW.unit = function(val) {
  return new RW(() => [val, []]);
}

RW.fail = function(val, log) {
  return new RW(() => [val, [log]]);
}

function zzz(iter) {
  return function step(resume) {
    const {value, done} = iter.next(resume);
    // console.log(value, done);
    const rw = (value instanceof RW) ?
      value : RW.unit(value);
    return done ? rw : rw.flatMap(step);
  }();
}

// ----------------------------------------------------------------------------

const filters = {
  toUpper(str) {
    if (typeof str !== 'string') {
      return RW.fail(str, `Invalid argument to toUpper: ${typeof str}`);
    }

    return str.toUpperCase();
  },
  toLower(str) {
    if (typeof str !== 'string') {
      return RW.fail(str, `Invalid argument to toLower: ${typeof str}`);
    }

    return str.toLowerCase();
  }
};

function* Reference({name}) {
  const args = yield RW.ask();
  return name in args ?
    yield args[name] :
    yield RW.fail(name, `Unknown reference: ${name}`);
}

function* Filter({name, arg}) {
  const val = yield* Value(arg);
  const filter = filters[name];

  if (!filter) {
    return yield RW.fail(val, `Unknown filter: ${name}`);
  }

  return yield filter(val);
}

function* Value(expr) {
  switch (expr.type) {
    case 'Text':
      return yield expr.value;
    case 'Reference':
      return yield* Reference(expr);
    case 'Filter':
      return yield* Filter(expr);
  }
}

function* interpolate(str) {
  let result = yield '';
  for (const part of parse(str)) {
    result += yield* Value(part);
  }
  return result;
}

function format(str, args) {
  return zzz(interpolate(str, args)).run(args);
}

// const result = format('aaa {b|toUpper|xxx} ccc {d|toUpper} eee', {
//   b: 'bBb',
//   d: 5,
// });

// console.log(result);
