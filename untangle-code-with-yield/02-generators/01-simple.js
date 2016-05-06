function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

const iter = gen();
iter.next();
iter.next();
iter.next();
iter.next();
