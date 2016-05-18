{{{

  const result = wield(function* () {
    const a = yield 1;
    console.log(a);
    const b = yield 2;
    console.log(b);
    return a + b;
  }());

  console.log(result);

  function wield(iter) {
    let {value, done} = iter.next();
    while (!done) {
      ({value, done} = iter.next(value));
    }
    return value;
  }

}}}
{{{

  const result = wield(function* () {
    const a = yield 1;
    console.log(a);
    const b = yield 2;
    console.log(b);
    return a + b;
  }());

  console.log(result);

  function wield(iter) {
    function step(resume) {
      const {value, done} = iter.next(resume);
      return done ? value : step(value);
    }

    return step();
  }

}}}
{{{

  const result = wield(function* () {
    const a = yield {result: 1};
    console.log(a);
    const b = yield {result: 2};
    console.log(b);
    return {result: a + b};
  }());

  console.log(result);

  function wield(iter) {
    function step(resume) {
      const {value, done} = iter.next(resume);
      if (done) {
        return value;
      } else {
        const {result: curResult} = value;
        return step(curResult);
      }
    }

    return step();
  }

}}}
{{{

  const result = wield(function* () {
    const a = yield {result: 1, log: 'One'};
    console.log(a);
    const b = yield {result: 2, log: 'Two'};
    console.log(b);
    return {result: a + b, log: 'Sum'};
  }());

  console.log(result);

  function wield(iter) {
    function step(resume) {
      const {value, done} = iter.next(resume);
      if (done) {
        return value;
      } else {
        const {result: curResult, log: curLog} = value;
        const {result, log} = step(curResult);
        return {result, log: curLog + ', ' + log};
      }
    }

    return step();
  }

}}}
