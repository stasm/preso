class Words {
  constructor(str) {
    this.str = str;
  }
  *[Symbol.iterator]() {
    const re = /\S+/g;
    let match;
    while (match = re.exec(this.str)) {
      yield match[0];
    }
  }
}


module.exports = function print(str) {
  const words = new Words(str);

  for (const word of words) {
    console.log(word);
  }

  console.log();
}
