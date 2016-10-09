var $ = require('jquery');

var $titleInput = $('#title-input');
var $bodyInput = $('#body-input');

var votes = ['None', 'Low', 'Normal', 'High', 'Critical'];

$(document).ready(function() {
  TaskBox.getTaskFromLocalStorage();
  TaskBox.renderStoredTasksToPage();
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

function Task (title, body, id, importance, status) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || votes[2];
  this.status = status || "incomplete";
}

var TaskBox = {
  tasksArray: [],
  completedTasksArray: [],

  generateTask: function() {
    var task = new Task ($titleInput.val(), $bodyInput.val());
    this.saveTaskInArray(task);
    this.renderTaskToPage(task);
    this.saveToLocalStorage();
  },

  saveTaskInArray: function(task) {
    this.tasksArray.push(task);
  },

  hideCompletedTasks: function(task) {
    if(task.status === "completed") {
      $(this).parent().attr("visibility", "hidden");
    }
  },

  renderTaskToPage: function(task) {
    $('.task-list').prepend(`
    <section id=${task.id} class="container">

    <button class="delete-button" aria-label="Delete"></button>

    <article class="task-text">
      <h2 contenteditable=true class="task-title">${task.title}</h2>
      <p contenteditable=true class="task-body">${task.body}</p>
    </article>

    <article class="task-values">
      <button class="completed-task" aria-label="Mark complete">Completed</button>
      <button class="up-arrow" aria-label="Increase importance"></button>
      <button class="down-arrow" aria-label="Decrease importance"></button>
      <p class="importance-text task-importance" tabindex="0" >Importance:</p>
      <p class="task-importance importance-value" tabindex="0">${task.importance}</p>
    </article>

    <p class="task-status">${task.status}</p>

    </section>`);
  },

  saveToLocalStorage: function() {
    localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
    localStorage.setItem('completedTasksArray', JSON.stringify(this.completedTasksArray));
  },


  getTaskFromLocalStorage: function() {
    var storedTasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    var storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasksArray'));
    if (storedTasksArray) {
      this.tasksArray = storedTasksArray.map(function(task) {
        return new Task(task.title, task.body, task.id, task.importance, task.status);
      });
    }
    if (storedCompletedTasks) {
      this.completedTasksArray = storedCompletedTasks.map(function(task) {
        return new Task(task.title, task.body, task.id, task.importance, task.status);
      });
    }
  },

  renderStoredTasksToPage: function() {
    var smallArray = this.tasksArray.slice(-10, this.tasksArray.length);
    smallArray.forEach(function(task) {
        TaskBox.renderTaskToPage(task);
    });
  },

  renderMoreTasks: function() {
    this.tasksArray.forEach(function(task) {
      TaskBox.renderTaskToPage(task);
    });
  },

  renderCompletedTasksToPage: function() {
    this.completedTasksArray.forEach(function(task) {
      TaskBox.renderTaskToPage(task);
    });
  },

  deleteTaskFromPage: function(id) {
    id = +id;
    this.tasksArray = this.tasksArray.filter(function(tasks) {
      return tasks.id !== id;
    });
    this.saveToLocalStorage();
  },

  deleteCompletedTask: function(id) {
    id = +id;
    this.completedTasksArray = this.completedTasksArray.filter(function(tasks) {
      return tasks.id !== id;
    });
    this.saveToLocalStorage();
  },

    saveEditedTitle: function(id, newTitle) {
     id = +id;
     this.tasksArray.forEach(function(tasks) {
       if (tasks.id === id) {
         tasks.title = newTitle;
       }
     });
     this.saveToLocalStorage();
   },

   saveEditedTask: function(id, newBody) {
    id = +id;
    this.tasksArray.forEach(function(tasks) {
      if (tasks.id === id) {
        tasks.body = newBody;
      }
    });
    this.saveToLocalStorage();
  },

  saveImportanceValue: function(id, newImportance) {
    id = +id;
    this.tasksArray.forEach(function(tasks) {
      if (tasks.id === id) {
        tasks.importance = newImportance;
      }
    });
    this.saveToLocalStorage();
  },

  saveTaskInNewArray: function(task) {
    this.completedTasksArray.push(task);
  },

  markComplete: function(id, newStatus) {
    id = +id;
    this.tasksArray.forEach(function(tasks) {
      if (tasks.id === id) {
        tasks.status = newStatus;
        TaskBox.saveTaskInNewArray(tasks);
      }
    });
    this.deleteTaskFromPage(id);
    this.saveToLocalStorage();
  }

};

function enableSubmit() {
 if ($bodyInput.val().length > 0 && $titleInput.val().length > 0) {
     $("#save-btn").attr("disabled", false);
 } else {
   $("#save-btn").attr("disabled", true);
 }
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

function resetCharacterCount() {
  var characterCount = ($bodyInput.val().length);
  $('#character-counter').text('Character Count: ' + characterCount + "/120");
}

$('.show-more-button').on('click', function() {
  $('.task-list').children().remove();
  TaskBox.renderMoreTasks();
});

$('#save-btn').on('click', function() {
  TaskBox.generateTask();
  if ($('.task-list').children().length > 10) {
    $('.task-list').children(":last-child").hide();
  }
  clearInputFields();
  resetCharacterCount();
  $("#save-btn").attr("disabled", true);
});

$('.show-completed-button').on('click', function() {
  TaskBox.renderCompletedTasksToPage();
});

$('.task-list').on('click', '.delete-button', function() {
  var taskId = $(this).parent().attr('id');
  TaskBox.deleteTaskFromPage(taskId);
  TaskBox.deleteCompletedTask(taskId);
  $(this).parent().remove();
});

$('.task-list').on('keyup', '.task-title', function(task) {
  var newTitle = $(this).text();
  var taskId = $(this).parent().parent().attr('id');
  TaskBox.saveEditedTitle(taskId, newTitle);
});

$('.task-list').on('keyup', '.task-body', function(task) {
  var newBody = $(this).text();
  var taskId = $(this).parent().parent().attr('id');
  TaskBox.saveEditedTask(taskId, newBody);
});

$('.task-list').on('click', '.completed-task', function(task) {
var taskId = $(this).parent().parent().attr('id');
var newStatus = "complete";
$(this).parent().parent().removeClass('incomplete').addClass('complete');
TaskBox.markComplete(taskId, newStatus);
});

$('.task-list').on('click', '.up-arrow', function(task) {
  var taskId = $(this).parent().parent().attr('id');
  updateImportance(this, increaseImportance(this));
  var newImportance = $(this).siblings('.importance-value').text();
  TaskBox.saveImportanceValue(taskId, newImportance);
});

$('.task-list').on('click', '.down-arrow', function(task) {
  var taskId = $(this).parent().parent().attr('id');
  updateImportance(this, decreaseImportance(this));
  var newImportance = $(this).siblings('.importance-value').text();
  TaskBox.saveImportanceValue(taskId, newImportance);
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
