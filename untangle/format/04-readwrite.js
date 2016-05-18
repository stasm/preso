const print = require('./print');
const parse = require('./parse');

module.exports = format;

class ReadWrite {
  constructor(fn) {
    this.fn = fn;
  }

  run(ctx) {
    return this.fn(ctx);
  }

  flatMap(fn) {
    return new ReadWrite(ctx => {
      const [cur, curErrs] = this.run(ctx);
      const [val, valErrs] = fn(cur).run(ctx);
      return [val, [...curErrs, ...valErrs]];
    });
  }
}

function ask() {
  return new ReadWrite(ctx => [ctx, []]);
}

function tell(log) {
  return new ReadWrite(() => [null, [log]]);
}

function unit(val) {
  return new ReadWrite(() => [val, []]);
}

function fail(val, log) {
  return new ReadWrite(() => [val, [log]]);
}

function wield(iter) {
  return function step(resume) {
    const {value, done} = iter.next(resume);
    const rw = (value instanceof ReadWrite) ?
      value : unit(value);
    return done ? rw : rw.flatMap(step);
  }();
}

// ----------------------------------------------------------------------------

const filters = {
  toUpper(str) {
    if (typeof str !== 'string') {
      return fail(str, `Invalid argument to toUpper: ${typeof str}`);
    }

    return str.toUpperCase();
  },
  toMonth(date) {
    if (!(date instanceof Date)) {
      return fail(date, `Invalid argument to toMonth: ${typeof date}`);
    }
    return date.toLocaleString('en-US', { month: 'long' });
  }
};

function* Reference({name}) {
  const args = yield ask();
  return name in args ?
    yield args[name] :
    yield fail(name, `Unknown reference: ${name}`);
}

function* Filter({name, arg}) {
  const val = yield* Value(arg);
  const filter = filters[name];

  if (!filter) {
    return yield fail(val, `Unknown filter: ${name}`);
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
  return wield(interpolate(str, args)).run(args);
}

const [result, errors] = format(
  '{ city } in { date | toMonht | toUpper }',
  { city: 'Warsaw', date: new Date() }
);

print(result);
console.dir(errors);
