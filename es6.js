// {{{ intro

  the future of js is now.
  how to make the most of it?

  staś małolepszy
  @stas
  19 marca 2016

// }}}
// {{{ arrow functions 1

  arr.map(
    function(elem) { return elem.prop; }
  );

  arr.map(
    elem => elem.prop
  );

// }}}
// {{{ arrow functions 2

  doSomethingAsync.then(
    console.log.bind(console)
  );

  doSomethingAsync.then(
    res => console.log(res)
  );

// }}}
// {{{ arrow functions 3: this

  Cache.prototype.purgeAll = function() {
    this.urls.forEach(function(url) {
      this.purge(url, true);
    }.bind(this);
  }

  Cache.prototype.purgeAll = function() {
    this.urls.forEach(
      url => this.purge(url, true)
    });
  }

// }}}
// {{{ block-scoped variables

  var i;

  let i;
  const hello = doSomething();

// }}}
// {{{ block-scoped variables in loops 1

  for (var a of document.querySelectorAll('a')) {
    a.addEventListener(
      'click',
      () => alert(a.getAttribute('href'))
    );
  }

// }}}
// {{{ block-scoped variables in loops 2

  for (let a of document.querySelectorAll('a')) {
    a.addEventListener(
      'click',
      () => alert(a.getAttribute('href'))
    );
  }

// }}}
// {{{ for-of and iteration

  for (let elem of iterable) {
    // ...
  }

// }}}
// {{{ object property shorthand 1

  const foo = 'foo';

  const obj = {
    foo: foo,
  }

  const obj = {
    foo
  }

// }}}
// {{{ object property shorthand 2

  function() {
    // ...
    return {name, type};
  }

// }}}
// {{{ object property shorthand 3

  function find(key) {
    return Model.find({key});
  }

// }}}
// {{{ destructuring assignment 1

  const prop = elem.prop;

  const { prop } = elem;

// }}}
// {{{ destructuring assignment 2

  const elem = {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz',
  };

  const { foo, bar } = elem;

// }}}
// {{{ destructuring assignment 3

  const elem = {
    foo: 'foo',
    bar: {
      quux: 'quux'
    }
  };

  const { foo, bar: { quux } } = elem;

// }}}
// {{{ destructuring assignment 4

  const { foo } = elem;
  const { foo: foo } = elem;
  console.log(foo);

  const { foo: myFoo } = elem;
  console.log(myFoo);

// }}}
// {{{ destructuring assignment 4

  const { foo: myFoo, bar: { quux: myQuux } } = elem;
  console.log(myQuux);

// }}}
// {{{ destructuring in loops 1

  const people = [
    { name: 'malezy' },
    { name: 'posygo' },
  ];

  for (let {name} of people) {
    // ...
  }

// }}}
// {{{ destructuring in loops 2

  const arr = [
    ['a', {}]
    ['b', { foo: 'foo' }]
  ];

  for (let [key, data] of arr) {
    // ...
  }

// }}}
// {{{ destructuring in loops 3

  const arr = [
    ['a', {}]
    ['b', { foo: 'foo' }]
  ];

  for (let [index, [key, data]] of arr.entries()) {
    // ...
  }

// }}}
// {{{ destructuring in arguments

  function rectarea(p1, p2) {
    return Math.abs(
      (p2.x - p1.x) * (p2.y - p1.y)
    );
  }

  function rectarea({x: x1, y: y1}, {x: x2, y: y2}) {
    return Math.abs(
      (x2 - x1) * (y2 - y1)
    );
  }

// }}}
// {{{ default values for parameters 1

  function doSomething(arg, options = {debug: false}) {
    // ...
  }

  doSomething('hello', {debug: true});

// }}}
// {{{ default values for parameters 2

  function omg({ x = 10 } = {}, { y } = { y: 10 }) {
    console.log(x, y);
  }

// }}}
// {{{ computed property names

  const foo = 'foo';

  const obj = {
    [foo]: 1
  };

// }}}
// {{{ Object.assign

  const obj = {
    foo: 'foo'
  }

  const newObj = Object.assign({}, obj, {
    bar: 'bar'
  });

// }}}
// {{{ Object.assign for merging

  const obj = {
    foo: 'foo'
  }

  const newObj = Object.assign({}, obj, {
    bar: 'bar'
  });

// }}}
// {{{ Object.assign with reduce

  function arr2obj(arr) {
    return arr.reduce(
      (obj, [key, val]) => Object.assign(obj, {
        [key]: val
      }, {})
    );
  }

  arr2obj([
    ['foo', 1],
    ['bar', 2],
  ]);

// }}}
// {{{ Object.assign for composition

  const jumper = (state) => ({
    jump: () => state.jumping = true;
  });

  function createPlayer() {
    const state = {
      // ...
      jumping: false
    };

    return Object.assign(
      {},
      jumper(state)
    );
  }

  createPlayer().jump();

// }}}
// {{{ rest parameters 1

  function foo(...args) {
    // args is an Array
  }

  foo(1, 2, 3);
  // → [1, 2, 3]

// }}}
// {{{ rest parameters 2

  doSomethingAsync.then(
    res => console.log(res)
  );

  doSomethingAsync.then(
    (...args) => console.log(...args)
  );

  doSomethingAsync.then(unbound);

  doSomethingAsync.then(
    (...args) => unbound(...args)
  );

// }}}
// {{{ spread 1

  Array.prototype.slice.call(
    document.querySelectorAll('p')
  );

  [...document.querySelectorAll('p')];

// }}}
// {{{ spread 2

  [...arr, elem]
  [elem, ...arr]

// }}}
// {{{ spread 3

  const pos = arr.indexOf(elem);

  [...arr.slice(0, pos), ...arr.slice(pos + 1)];

// }}}
// {{{ Promises for storing one-off state

  function Text(src) {
    this.loaded = fetch(src).then(
      resp => resp.text()
    );
  }

// }}}
// {{{ Promises and catch

  return doAsync
    .then(process)
    .catch(err => console.error(err.stack));

// }}}
// {{{ Promise.resolve

  return exists ?
    doSomethingAsync() :
    Promise.resolve();

// }}}
// {{{ Promise.resolve in lieu of new Promise()

  return Promise.resolve().then(
  // ...
);

// }}}
// {{{ Promise.all

  const urls = [
    '/foo.txt',
    '/bar.txt',
  ];

  return Promise.all(
    urls.map(
      url => fetch(url).then(
        resp => resp.text()
      )
    )
  );

// wspomnieć o ...args w then()

// }}}
// {{{ sequences of Promises

  const urls = [
    '/foo.txt',
    '/bar.txt',
  ];

  return urls.reduce(
    (seq, url) => seq.then(
      () => fetch(url).then(
        resp => resp.text()
      )
    ),
    Promise.resolve()
  );

// }}}
// {{{ Promise.then performance

  setTimeout(() => console.log('yo'));

  function recurse() {
    Promise.resolve().then(recurse);
  }
  Promise.resolve().then(recurse);

// }}}
// {{{ Destructuring Promise.then arguments

  Promise.all(things).then(
    values => ...
  );

  Promise.all(things).then(
    [foo, bar] => ...
  );

// }}}
// {{{ New data types

  const map = new Map();
  const set = new Set();

  const wmap = new WeakMap();
  const wset = new WeakSet();

// }}}
// {{{ WeakMaps for private data

  const props = new WeakMap();

  function MyObject(name) {
    this.name = name;
    props.set(this, {
      createdAt: new Date()
    });
  }

// }}}
// {{{ Symbols for metaprogramming

class Range {
  constructor(max) {
    this.max = max;
  }
  [Symbol.iterator]() {
    const max = this.max;
    let i = 0;

    return {
      next() {
        return (i < max) ?
          {value: i++, done: false} :
          {value: undefined, done: true}
      }
    };
  }
}

const r = new Range(4);
for (let i of r) {
  console.log(i);
}

// }}}
// {{{ Symbols for unclashable method names

  import { jumper, jump } from './components/jumper';

  function createPlayer() {
    const state = {
      // ...
      jumping: false
    };

    return Object.assign(
      {},
      jumper(state)
    );
  }

  const player = createPlayer();
  player[jump]();

// }}}
// {{{ outro

  A that's it!
  Questions?

  @stas

// }}}
