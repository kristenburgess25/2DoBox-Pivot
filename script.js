var $ = require('jquery');
var Task = require('./task.js');
var taskBox = require('./taskBox');

var $titleInput = $('#title-input');
var $bodyInput = $('#body-input');

var votes = ['None', 'Low', 'Normal', 'High', 'Critical'];

$(document).ready(function() {
  taskBox.getTaskFromLocalStorage();
  taskBox.renderStoredTasksToPage();
});

function clearInputFields() {
  $titleInput.val('');
  $bodyInput.val('');
}

function updateImportance(e, value) {
  $(e).siblings('.importance-value').text(value);
}

function decreaseImportance(e) {
  var currentImportance = $(e).siblings('.importance-value').text();
  var arrayNumber = votes.indexOf(currentImportance);
  arrayNumber--;
  return votes[arrayNumber];
}

function increaseImportance(e) {
  var currentImportance = $(e).siblings('.importance-value').text();
  var arrayNumber = votes.indexOf(currentImportance);
  arrayNumber++;
  return votes[arrayNumber];
}

function enableSubmit() {
 if ($bodyInput.val().length > 0 && $titleInput.val().length > 0) {
     $("#save-btn").attr("disabled", false);
 } else {
   $("#save-btn").attr("disabled", true);
 }
}

function resetCharacterCount() {
  var characterCount = ($bodyInput.val().length);
  $('#character-counter').text('Character Count: ' + characterCount + "/120");
}


$titleInput.on('keyup', function () {
  enableSubmit();
});

$bodyInput.on('keyup', function() {
  var characterCount = ($bodyInput.val().length);
  $('#counter').text(characterCount);
  if (characterCount > 120) {
    $("#save-btn").attr("disabled", true);
    $('#character-counter').text('Character limit exceeded!');
  } else if (characterCount < 120) {
    resetCharacterCount();
    enableSubmit();
  }
});

$('#save-btn').on('click', function() {
  taskBox.generateTask();
  if ($('.task-list').children().length > 10) {
    $('.task-list').children(":last-child").hide();
  }
  clearInputFields();
  resetCharacterCount();
  $("#save-btn").attr("disabled", true);
});

$('.show-more-button').on('click', function() {
  $('.task-list').children().remove();
  taskBox.renderMoreTasks();
});


$('.show-completed-button').on('click', function() {
  taskBox.renderCompletedTasksToPage();
});

$('.task-list').on('click', '.delete-button', function() {
  var taskId = $(this).parent().attr('id');
  taskBox.deleteTaskFromPage(taskId);
  taskBox.deleteCompletedTask(taskId);
  $(this).parent().remove();
});

$('.task-list').on('keyup', '.task-title', function(task) {
  var newTitle = $(this).text();
  var taskId = $(this).parent().parent().attr('id');
  taskBox.saveEditedTitle(taskId, newTitle);
});

$('.task-list').on('keyup', '.task-body', function(task) {
  var newBody = $(this).text();
  var taskId = $(this).parent().parent().attr('id');
  taskBox.saveEditedTask(taskId, newBody);
});

$('.task-list').on('click', '.completed-task', function(task) {
var taskId = $(this).parent().parent().attr('id');
var newStatus = "complete";
$(this).parent().parent().removeClass('incomplete').addClass('complete');
taskBox.markComplete(taskId, newStatus);
});

$('.task-list').on('click', '.up-arrow', function(task) {
  var taskId = $(this).parent().parent().attr('id');
  updateImportance(this, increaseImportance(this));
  var newImportance = $(this).siblings('.importance-value').text();
  taskBox.saveImportanceValue(taskId, newImportance);
});

$('.task-list').on('click', '.down-arrow', function(task) {
  var taskId = $(this).parent().parent().attr('id');
  updateImportance(this, decreaseImportance(this));
  var newImportance = $(this).siblings('.importance-value').text();
  taskBox.saveImportanceValue(taskId, newImportance);
});

$('#search-input').on('keyup', function(){
    var filter = $(this).val();
    $('.container').each(function(){
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      }
      else {
        $(this).fadeIn();
      }
    });
});

$('.importance-button').on('click', function() {
  var filter = $(this).text();
  $('.container').each(function(){
    if($(this).children().text().search(new RegExp(filter, 'i')) < 0) {
      $(this).fadeOut();
    }
    else {
      $(this).fadeIn();
    }
  });
});
