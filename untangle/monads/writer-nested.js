function zzz(iter) {
  return function step(resume) {
    const {value, done} = iter.next(resume);
    return done ? value : value.flatMap(step);
  }();
}

class Writer {
  constructor(value = null, logs = []) {
    this.value = value;
    this.logs = logs;
  }

  flatMap(fn) {
    const {value, logs} = fn(this.value);
    return new Writer(value, [...this.logs, ...logs]);
  }
}

function unit(val) {
  return new Writer(val);
}

function add(a, b) {
  return new Writer(a + b, [`Added ${a} and ${b}`]);
}

function mul(a, b) {
  return new Writer(a * b, [`Multiplied ${a} by ${b}`]);
}

function* sumsquares(a, b) {
  const aa = yield mul(a, a);
  const bb = yield mul(b, b);

  return /* yield */ add(aa, bb);
}

const r1 = zzz(function* () {
  const a = yield add(1, 2);
  const b = yield add(3, 4);
  const sum = yield zzz(sumsquares(a, b));
  return unit(sum);
}());
console.log(r1);

const r2 = zzz(function* () {
  const a = yield add(1, 2);
  const b = yield add(3, 4);
  const sum = yield* sumsquares(a, b);
  return unit(sum);
}());
console.log(r2);
