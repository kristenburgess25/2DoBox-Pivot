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

it('Should have a function that renders tasks from local storage to the page', function(){
  assert.isFunction(taskBox.renderStoredTasksToPage);
});

it.skip('"taskBox.upvote" should increase the importance value by an index of 1 in the votes array', function(){
  var votes = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var arrayNumber = votes.indexOf('Normal');
  var newImportance = votes.indexOf('High');
  taskBox.saveImportanceValue();
  assert.equal(task.importance, newImportance);
});

  it('should save an edited title', function() {
    var newTitle = 'title';
    taskBox.saveEditedTitle(newTitle);
    assert.equal(task.title, newTitle);
  });

  it('should have an array for storing tasks', function() {
  taskBox.tasksArray = [];
  assert.isArray(taskBox.tasksArray);
});

  it('should add a new task to the array', function(){
    localStorage.clear();
    console.log(taskBox.tasksArray.length);
    taskBox.tasksArray = [];

    assert.equal(taskBox.tasksArray.length, 0);
    taskBox.saveTaskInArray();
    assert.equal(taskBox.tasksArray.length, 1);
  });

  it.skip('should remove a task from the array', function(){
    taskBox.tasksArray = [];
    taskBox.saveTaskInArray();
    console.log(taskBox.tasksArray.length);
    var startCount = taskBox.tasksArray.length;
    console.log(taskBox.tasksArray[0]);
    taskBox.deleteTaskFromPage(taskBox.tasksArray[0].id);
    assert.equal(taskBox.tasksArray.length, startCount - 1);
  });
  });
