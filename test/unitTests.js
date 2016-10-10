const assert = require('chai').assert;
const Task = require('../lib/task.js');
const taskBox = require('../lib/taskBox.js');
const script = require('../lib/script.js');



describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });
});


describe('Task Object', function(){
var task = new Task('title', 'body');

it('Task should be an object', function(){
  assert.isObject(task, true);
});

it('Task should have a default importance of Normal', function(){
  assert.equal(task.importance, 'Normal');
});

it('Task should have a default status status of incomplete', function(){
  assert.equal(task.status, 'incomplete');
});

// it('"taskBox.upvote" should increase the importance value by an index of 1 in the votes array', function(){
//   var arrayNumber = votes.indexOf('Normal');
//   var newImportance = arrayNumber++;
//   task.saveImportanceValue();
//   assert.equal(task.importance, newImportance);
// });

  it('should save an edited title', function() {
    var newTitle = 'Kristen';
    taskBox.saveEditedTitle(newTitle);
    assert.equal(task.title, 'Kristen');
  });
  });
