function zzz(iter) {
  return function step(resume) {
    const {value, done} = iter.next(resume);
    return done ? value : value.flatMap(step);
  }();
}

class Reader {
  constructor(fn) {
    this.fn = fn;
  }

  run(ctx) {
    return this.fn(ctx);
  }

  flatMap(fn) {
    return new Reader(
      ctx => fn(this.run(ctx)).run(ctx)
    );
  }
}

function unit(ctx) {
  return new Reader(() => ctx);
}

function ask() {
  return new Reader(ctx => ctx);
}

const r1 = new ask().flatMap(
  ctx => unit(`Hello, ${ctx}!`).flatMap(
    hello => unit(hello.toUpperCase())
  )
);
console.log(r1.run('A'));

const r2 = zzz(function* () {
  const ctx = yield ask();
  const hello = yield unit(`Hello, ${ctx}!`);
  return unit(hello.toUpperCase());
}());
console.log(r2.run('B'));
