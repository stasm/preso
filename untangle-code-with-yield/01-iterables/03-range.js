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

console.log(...r);
