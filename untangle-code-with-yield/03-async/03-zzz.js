function zzz(iter) {
  return function step(val) {
    const {value, done} = iter.next(val);
    return done ? value : value.then(step);
  }();
}

const toUpper = x => Promise.resolve(x.toUpperCase());

const result = zzz(function* () {
  const foo = yield toUpper('foo');
  const bar = yield toUpper('bar');
  const baz = yield toUpper('baz');

  return foo + bar + baz;
}());

result.then(console.log);
