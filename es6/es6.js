// {{{ intro



  Na co mi ten ECMAScript?

  staś małolepszy, @stas




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
    }.bind(this));
  }

  Cache.prototype.purgeAll = function() {
    this.urls.forEach(
      url => this.purge(url, true)
    });
  }

// }}}
// {{{ block-scoped variables 1




  var i;

  let i;
  const hello = doSomething();




// }}}
// {{{ block-scoped variables 2

  if (isAlly) {
    var hello = 'Hello';
  } else {
    var hello = 'Go away';
  }

  let hello;
  if (isAlly) {
    hello = 'Hello';
  } else {
    hello = 'Go away';
  }

  const hello = isAlly ?
    'Hello' : 'Go away';

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



  for (const a of document.querySelectorAll('a')) {
    a.addEventListener(
      'click',
      () => alert(a.getAttribute('href'))
    );
  }




// }}}
// {{{ for-of and iteration



  for (const elem of iterable) {
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



  function find(key) {
    return Model.find({key: key});
  }

  function find(key) {
    return Model.find({key});
  }




// }}}
// {{{ object property shorthand 3




  function foo() {
    // ...
    return {name, type};
  }




// }}}
// {{{ destructuring assignment in arrays




  function foo() {
    // ...
    return [name, type];
  }

  const [name, type] = foo();




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

  const { foo, bar: hey } = elem;




// }}}
// {{{ destructuring assignment 4




  const arr = ['a', 'b', 'c'];

  const [a] = arr;
  const [, b] = arr;




// }}}
// {{{ destructuring in loops 1



  const people = [
    { name: 'Sebastian' },
    { name: 'Bogusław' },
  ];

  for (const {name} of people) {
    // ...
  }



// }}}
// {{{ destructuring in loops 2



  const arr = [
    ['a', {}]
    ['b', { foo: 'foo' }]
  ];

  for (const [key, data] of arr) {
    // ...
  }



// }}}
// {{{ destructuring in arguments 1



  const lang = {
    name: 'English',
    code: 'en-US',
    dir: 'ltr'
  };

  function fetchResource(path, {code}) {
    return fetch(code + path).then(…);
  }



// }}}
// {{{ destructuring in arguments 2



  function foo() {
    // …
    return [name, type];
  }

  function bar([identifier]) {
    // …
  }

  bar(foo());



// }}}
// {{{ destructuring in arguments 3



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
// {{{ Object.assign with reduce


  function arr2obj(arr) {
    return arr.reduce(
      (obj, [key, val]) => Object.assign({}, obj, {
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


  Array.prototype.push.apply(arr1, arr2);

  arr1.push(...arr2);



// }}}
// {{{ rest parameters 3



  doSomethingAsync.then(
    res => console.log(res)
  );

  doSomethingAsync.then(
    (...args) => console.log(...args)
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

  const [head, ...tail] = arr;



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
// {{{ Promise.resolve



  return exists ?
    doSomethingAsync() :
    Promise.resolve();



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


// }}}
// {{{ sequences of Promises


  const urls = [
    '/foo.txt',
    '/bar.txt',
  ];

  return urls.reduce(
    (seq, url) => seq.then(
      () => fetch(url)
    ),
    Promise.resolve()
  );



// }}}
// {{{ Promise.then performance


  setTimeout(() => console.log('yo'));

  function recurse() {
    Promise.resolve().then(recurse);
  }

  // DO NOT TRY THIS AT HOME
  Promise.resolve().then(recurse);


// }}}
// {{{ Destructuring Promise.then arguments


  Promise.all(things).then(
    values => ...
  );

  Promise.all(things).then(
    ([foo, bar]) => ...
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

  class MyObject {
    constructor() {
      props.set(this, {
        initialized: true,
        createdAt: new Date()
      });
    }
  }

  const myobj = new MyObject();


// }}}
// {{{ WeakSets for tagging


  const myobjects = new WeakSet();

  class MyObject {
    constructor() { myobjects.add(this); }
    hello()       {
      return myobjects.has(this) ?
        'Hello' : 'Go away';
    }
  }

  const myobj = new MyObject();
  const fake = new FakeObject();

  MyObject.prototype.hello.call(fake);
  // → Go away

// }}}
// {{{ Symbols for metaprogramming

class Range {
  constructor(max) {
    this.max = max;
  }
  *[Symbol.iterator]() {
    let i = 0;
    while (i < this.max) {
      yield i++;
    }
  }
}

const r = new Range(4);
for (const i of r) {
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
// {{{ next: async functions



async function foobar() {
  const foo = await Promise.resolve('foo');
  const bar = await Promise.resolve('bar');

  return foo + bar;
}

foobar().then(console.log);




// }}}
// {{{ outro



  Dzięki!

  @stas




// }}}
