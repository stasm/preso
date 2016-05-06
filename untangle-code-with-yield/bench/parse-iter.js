const { start, stop, print } = require('./util');
const parse = require('../format/parse/parse-arr');
const str = 'aaa {a|b|c} bbb {a|b|c} ccc';

start('parse iter');
const body = [...parse(str)];
stop('parse iter');

print();
