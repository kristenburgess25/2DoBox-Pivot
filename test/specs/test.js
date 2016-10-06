var assert = require('assert')
describe('this is a warm up test', function(){
  it('should have an input field and I should be able to set a value inside of it', function(){
    // i need to define a browser (this is what i'll use to grab my shit)
    browser.url('/');


    // browser will let me find a specific element
    var titleField = browser.element('#title-input');
    // when I have the specific I will set a value inside of that element
    titleField.setValue('some great title');
    // I will then check the field to see if that element is there. // that is my assert

    assert.equal(titleField.getValue(), 'some great title');
  });
});
