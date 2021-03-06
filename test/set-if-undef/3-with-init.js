const assert = require('assert').strict;
const {setIfUndef} = require('../../');

const obj1 = setIfUndef(null, 'a', 'b', 'c', 100);
assert.deepEqual(obj1,{a: {b: {c: 100}}});

const obj2 = setIfUndef(undefined, 'a', 'b', 'c', 200);
assert.deepEqual(obj2,{a: {b: {c: 200}}});
