function zzz(iter) {
  return function step(resume) {
    const {value, done} = iter.next(resume);
    const rw = (value instanceof ReadWrite) ?
      value : unit(value);
    return done ? rw : rw.flatMap(step);
  }();
}

class ReadWrite {
  constructor(fn) {
    this.fn = fn;
  }

  run(ctx) {
    return this.fn(ctx);
  }

  flatMap(fn) {
    return new ReadWrite(ctx => {
      const [cur, logs1] = this.run(ctx);
      const [val, logs2] = fn(cur).run(ctx);
      return [val, [...logs1, ...logs2]];
    });
  }
}

function unit(ctx) {
  return new ReadWrite(() => [ctx, []]);
}

function tell(log) {
  return new ReadWrite(() => [null, [log]]);
}

function ask() {
  return new ReadWrite(ctx => [ctx, []]);
}

const r1 = new ask().flatMap(
  ctx => tell('About to say Hello').flatMap(
    () => unit(`Hello, ${ctx}!`).flatMap(
      hello => unit(hello.toUpperCase())
    )
  )
);
console.log(r1.run('A'));

const r2 = zzz(function* () {
  const ctx = yield ask();
  yield tell('About to say Hello');
  const hello = yield `Hello, ${ctx}!`;
  return hello.toUpperCase();
}());
console.log(r2.run('B'));
