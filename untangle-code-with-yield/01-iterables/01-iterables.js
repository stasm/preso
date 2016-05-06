const abc = ['a', 'b', 'c'];

for (const elem of abc) {
  console.log(elem);
}

console.log(...abc);

// Jak to działa?

Array.prototype[Symbol.iterator] = function*() {
  for (let i = 0; i < this.length; i++) {
    yield this[i];
  }
}

console.log(...['d', 'e', 'f']);
