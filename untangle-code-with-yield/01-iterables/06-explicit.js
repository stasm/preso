class Range {
  constructor(max) {
    this.max = max;
  }
  [Symbol.iterator]() {
    const max = this.max;
    let i = 0;
    return {
      next() {
        return i < max ?
          { value: i++, done: false } :
          { value: undefined, done: true };
      }
    };
  }
}

const r = new Range(4);

console.log(...r);
