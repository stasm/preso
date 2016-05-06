class Words {
  constructor(str) {
    this.str = str;
  }
  *[Symbol.iterator]() {
    const re = /\w+/g;
    let match;
    while (match = re.exec(this.str)) {
      yield match[0];
    }
  }
}

const hello = new Words('hello world');

for (const word of hello) {
  console.log(word);
}
