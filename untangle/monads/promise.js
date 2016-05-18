{{{

  const toUpper = x => Promise.resolve(x.toUpperCase());

  const result = toUpper('foo').then(
    foo => toUpper('bar').then(
      bar => toUpper('baz').then(
        baz => foo + bar + baz
      )
    )
  );

  result.then(console.log);

}}}
{{{

  function wield(iter) {
    return function step(val) {
      const {value, done} = iter.next(val);
      return done ? value : value.then(step);
    }();
  }

  const toUpper = x => Promise.resolve(x.toUpperCase());

  const result = wield(function* () {
    const foo = yield toUpper('foo');
    const bar = yield toUpper('bar');
    const baz = yield toUpper('baz');

    return foo + bar + baz;
  }());

  result.then(console.log);

}}}
