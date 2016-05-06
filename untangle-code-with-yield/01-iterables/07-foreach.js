for (const elem of ['a', 'b', 'c']) {
  console.log(elem);
}

// for-of under the hood
function foreach(iterable, fn) {
  const iter = iterable[Symbol.iterator]();
  let result;
  while (!(result = iter.next()).done) {
    const elem = result.value;
    fn(elem);
  }
}

foreach(['d', 'e', 'f'], console.log);
