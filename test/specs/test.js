var assert = require('assert');
// var expect = require('expect');

describe('the landing page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/');
    var title = browser.getTitle();
    assert.equal(title, '2DoBox Box');
    });
  });

describe('the attributes of the application', function(){
  it('should have a title input field and I should be able to set a value inside of it', function(){
    // i need to define a browser (this is what i'll use to grab my shit)
    browser.url('/');
    // browser will let me find a specific element
    var titleField = browser.element('#title-input');
    // when I have the specific I will set a value inside of that element
    titleField.setValue('title of task');
    // I will then check the field to see if that element is there. // that is my assert
    assert.equal(titleField.getValue(), 'title of task');
  });
  it ('should have a task input field where I should be able to set a value inside of it', function() {
    browser.url('/');
    var bodyField = browser.element('#body-input');
    bodyField.setValue('description of task');
    assert.equal(bodyField.getValue(), 'description of task');
  });
  it('should take these inputs and add them to the page when save button is clicked', function(){
  //As a user,
  // when I go to the root of your application.
  browser.url('/');
  // I should see two input fields.
  // One for an idea title and one for an idea description.
  var titleField = browser.element('#title-input');
  var bodyField  = browser.element('#body-input');
  // When I fill out both fields and
  titleField.setValue('title of task');
  bodyField.setValue('description of task');
  browser.click('#save-btn');
  var allTasks = browser.getText('article');
  // I expect my idea to be posted onto the page.
  assert.equal(allTasks.replace(/\n/, ", "), 'title of task, description of task');
  }
);
  it('should clear the input fields when the save button is clicked', function(){
    browser.url('/');
    var titleField = browser.element('#title-input');
    var bodyField  = browser.element('#body-input');
    browser.click('#save-btn');
    assert.equal(titleField.clearElement());
    assert.equal(bodyField.clearElement());
  }
);
  it('should delete a task item when the delete button is clicked', function(){
    browser.url('/');
  var taskBox = browser.element('section');
  browser.click('.delete-button');
  assert.expect(taskBox).to.not.exist;
});
});
