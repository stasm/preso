Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  while (i < this) {
    yield i++;
  }
}

console.log(...3);
