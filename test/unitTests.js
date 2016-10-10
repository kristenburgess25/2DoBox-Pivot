var $ = require('jquery');
const assert = require('chai').assert;
const Task = require('../lib/script.js');

describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });
});

// describe('Task Object', function(){
// var task = new Task();
//
// it('Task should be an object', function(){
//   assert.isObject(task, true);
// });
//
// it.skip('Task should have a default importance of normal/votes[2]', function(){
//   assert.equal(task.importance, votes[2]);
// });
//
// it.skip('Task should have a default status status of incomplete', function(){
//   assert.equal(task.status, 'incomplete');
// });
//   });
