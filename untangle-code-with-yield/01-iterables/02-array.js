// [index, value] tuples

Array.prototype[Symbol.iterator] = function*() {
  for (let i = 0; i < this.length; i++) {
    yield [i, this[i]];
  }
}

console.log(...['a', 'b', 'c']);

// feeling lucky

Array.prototype[Symbol.iterator] = function*() {
  for (let i = 0; i < this.length; i++) {
    yield this[Math.floor(Math.random() * this.length)];
  }
}

console.log(...['d', 'e', 'f']);
