var assert = require('assert');

describe('the landing page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/');
    var title = browser.getTitle();
    assert.equal(title, '2DoBox-Pivot');
    });
  });

describe('the attributes of the application', function(){
  it('should have a title input field and I should be able to set a value inside of it', function(){
    browser.url('/');
    var titleField = browser.element('#title-input');
    titleField.setValue('title of task');
    assert.equal(titleField.getValue(), 'title of task');
  });
  it ('should have a task input field where I should be able to set a value inside of it', function() {
    browser.url('/');
    var bodyField = browser.element('#body-input');
    bodyField.setValue('description of task');
    assert.equal(bodyField.getValue(), 'description of task');
  });
  it('should take these inputs and add them to the page when save button is clicked', function(){
  browser.url('/');
  var titleField = browser.element('#title-input');
  var bodyField  = browser.element('#body-input');
  titleField.setValue('title of task');
  bodyField.setValue('description of task');
  browser.click('#save-btn');
  var allTasks = browser.getText('.task-text');
  assert.equal(allTasks.replace(/\n/, ", "), 'title of task, description of task');
  }
);
  it('should clear the input fields when the save button is clicked', function(){
    browser.url('/');
    var titleField = browser.element('#title-input');
    var bodyField  = browser.element('#body-input');
    browser.click('#save-btn');
    assert.equal(titleField.getText(), '');
    assert.equal(bodyField.getText(), '');
  }
);
it('should edit the title and description when these fields are changed', function(){
  var taskTitle = browser.element('.task-title');
  var taskBody = browser.element('.task-body');
  assert.equal(taskTitle.getText(), 'title of task');
  assert.equal(taskBody.getText(), 'description of task');
  taskTitle.setValue('new task title');
  browser.click('.task-list');
  taskBody.setValue('new task body');
  browser.click('.task-list');
  assert.equal(taskTitle.getText(), 'new task title');
  assert.equal(taskBody.getText(), 'new task body');
});
it('should set a default importance vaue of "Normal" on a newly created task', function() {
  browser.url('/');
  var titleField = browser.element('#title-input');
  var bodyField  = browser.element('#body-input');
  titleField.setValue('title of task');
  bodyField.setValue('description of task');
  browser.click('#save-btn');
  var taskImportance = browser.element('.importance-value');
  assert.equal(taskImportance.getText(), 'Normal');
});
it('allows me to upvote the importance of a task from its default state', function(){
  browser.url('/');
  var titleField = browser.element('#title-input');
  var bodyField  = browser.element('#body-input');
  titleField.setValue('title of task');
  bodyField.setValue('description of task');
  browser.click('#save-btn');
  var taskImportance = browser.element('.importance-value');
  assert.equal(taskImportance.getText(), 'Normal');
  browser.click('.up-arrow');
  assert.equal(taskImportance.getText(), 'High');
  browser.click('.up-arrow');
  assert.equal(taskImportance.getText(), 'Critical');
});
it('allows me to downvote the importance of a task from its default state', function(){
  browser.url('/');
  var titleField = browser.element('#title-input');
  var bodyField  = browser.element('#body-input');
  titleField.setValue('title of task');
  bodyField.setValue('description of task');
  browser.click('#save-btn');
  var taskImportance = browser.element('.importance-value');
  assert.equal(taskImportance.getText(), 'Normal');
  browser.click('.down-arrow');
  assert.equal(taskImportance.getText(), 'Low');
  browser.click('.down-arrow');
  assert.equal(taskImportance.getText(), 'None');
});
it.skip('should delete a task item when the delete button is clicked', function(){
  browser.url('/');
  var titleField = browser.element('#title-input');
  var bodyField  = browser.element('#body-input');
  titleField.setValue('title of task');
  bodyField.setValue('description of task');
  browser.click('#save-btn');

  var lengthOfTaskList = browser.element('section').getText().length;
 browser.click('.delete-button');
 var lengthAfterDelete = browser.element('section').getText().length;
 assert.equal(lengthAfterDelete,lengthOfTaskList-1);
});

it('allows me to filter tasks by importance of NONE when the "None" button is clicked', function(){
  browser.url('/');
  var titleField = browser.element('#title-input');
  var bodyField  = browser.element('#body-input');
  titleField.setValue('title of task');
  bodyField.setValue('description of task');
  browser.click('#save-btn');
  browser.click('.down-arrow');
  browser.click('.down-arrow');
  var taskImportance = browser.element('.importance-value');
  browser.click('#none');
  assert.equal(taskImportance.getText(), 'None');
  });

  it('allows me to filter tasks by importance of LOW when the "Low" button is clicked', function(){
    browser.url('/');
    var titleField = browser.element('#title-input');
    var bodyField  = browser.element('#body-input');
    titleField.setValue('title of task');
    bodyField.setValue('description of task');
    browser.click('#save-btn');
    browser.click('.down-arrow');
    var taskImportance = browser.element('.importance-value');
    browser.click('#low');
    assert.equal(taskImportance.getText(),'Low');
    });

  it('allows me to filter tasks by importance of "NORMAL" when the "Normal" button is clicked', function(){
      browser.url('/');
      var titleField = browser.element('#title-input');
      var bodyField  = browser.element('#body-input');
      titleField.setValue('title of task');
      bodyField.setValue('description of task');
      browser.click('#save-btn');
      var taskImportance = browser.element('.importance-value');
      browser.click('#none');
      assert.equal(taskImportance.getText(), 'Normal');
      });

    it('allows me to filter tasks by importance of "HIGH" when the "High" button is clicked', function(){
        browser.url('/');
        var titleField = browser.element('#title-input');
        var bodyField  = browser.element('#body-input');
        titleField.setValue('title of task');
        bodyField.setValue('description of task');
        browser.click('#save-btn');
        browser.click('.up-arrow');
        var taskImportance = browser.element('.importance-value');
        browser.click('#high');
        assert.equal(taskImportance.getText(), 'High');
        });
    it('allows me to filter tasks by importance of "CRITICAL" when the "Critical" button is clicked', function(){
        browser.url('/');
        var titleField = browser.element('#title-input');
        var bodyField  = browser.element('#body-input');

        titleField.setValue('title of task');
        bodyField.setValue('description of task');
        browser.click('#save-btn');
        browser.click('.up-arrow');
        browser.click('.up-arrow')
        var taskImportance = browser.element('.importance-value');
        browser.click('#critical');
        assert.equal(taskImportance.getText(), 'Critical');
            });

});
