const toUpper = x => Promise.resolve(x.toUpperCase());

const result = toUpper('foo').then(
  foo => toUpper('bar').then(
    bar => toUpper('baz').then(
      baz => foo + bar + baz
    )
  )
);

result.then(console.log);
