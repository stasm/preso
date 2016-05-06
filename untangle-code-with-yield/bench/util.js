function micro(hrt) {
  // hrt is [seconds, nanoseconds]
  return Math.round((hrt[0] * 1e9 + hrt[1]) / 1000);
}

const timers = {};

exports.start = function start(name) {
  timers[name] = process.hrtime();
}

exports.stop = function stop(name) {
  timers[name] = process.hrtime(timers[name]);
}

exports.print = function print() {
  for (const name in timers) {
    console.log(`${name}: ${micro(timers[name])} μs`);
  }
}
