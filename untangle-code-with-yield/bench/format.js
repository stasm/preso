const { start, stop, print } = require('./util');

const f1 = require('../format/01-naive');
const f2 = require('../format/02-errors');
const f3 = require('../format/03-writer');
const f4 = require('../format/04-readwrite');

const str = 'a {b|toUpper} c {d|toUpper|toLower} e {f} g {h}';
const args = { b: 'b', d: 'd', f: 'f', h: 'h' };

start('naive');
f1(str, args);
stop('naive');

start('with errors');
f2(str, args);
stop('with errors');

start('writer');
f3(str, args);
stop('writer');

start('readwrite');
f4(str, args);
stop('readwrite');

print();
