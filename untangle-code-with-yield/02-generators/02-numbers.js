function* numbers() {
  let i = 0;

  while (true) {
    yield i++;
  }
}

const iter1 = numbers();
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());

const iter2 = numbers();
console.log(iter2.next());
