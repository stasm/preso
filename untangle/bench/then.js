const { start, stop, print } = require('./util');

class Result {
  constructor(val) {
    this.val = val;
  }
  then(fn) {
    return Result.resolve(fn(this.val));
  }
}

Result.resolve = function(val) {
  return val instanceof Result ?
    val : new Result(val);
}

start('a');
const foo = 'foo';
const bar = 'bar';
const a = foo + bar;
stop('a');

start('b');
const b = Result.resolve('foo').then(
  foo => {
    // console.log('b we got foo');
    return Result.resolve('bar').then(
      bar => {
        // console.log('b we got bar');
        return foo + bar
      }
    )
  }
);

// console.log('1');

b.then(foobar => {
  stop('b');
});

start('c')
const c = Promise.resolve('foo').then(
  foo => {
    // console.log('c we got foo');
    return Promise.resolve('bar').then(
      bar => {
        // console.log('c we got bar');
        return foo + bar
      }
    )
  }
);

// console.log('2');

c.then(foobar => {
  stop('c');
  print();
});

