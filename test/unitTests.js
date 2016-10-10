const assert = require('chai').assert;
const Task = require('../script.js')

describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });
});

describe('Task', function(){
// it('should be a function', function() {
//   assert.isFunction(Task);
// });

it('should instantiate a task object', function(){
  // var task = new Task();
  assert.isObject(Task);
});
//
// it('Task should have a default importance of normal/votes[2]', function(){
//   assert.equal(this.importance, votes[2]);
// });
//
// it('Task should have a default status status of incomplete', function(){
//   assert.equal(this.status, 'incomplete');
// });
  });
