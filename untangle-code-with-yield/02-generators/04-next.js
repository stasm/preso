function* gen() {
  while (true) {
    const value = yield null;
    console.log(value);
  }
}

const g = gen();
g.next();
g.next(1);
g.next(2);

function* add() {
  const a = yield null;
  const b = yield null;
  return a + b;
}

const adder = add();
adder.next();
adder.next(1);
console.log(adder.next(2));
