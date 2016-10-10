var Task = require('./task');

var $titleInput = $('#title-input');
var $bodyInput = $('#body-input');

var votes = ['None', 'Low', 'Normal', 'High', 'Critical'];

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

  findUniqueId: function(id) {
    uniqueId = +id;
  },

  deleteTaskFromPage: function(id) {
    this.findUniqueId(id);
    this.tasksArray = this.tasksArray.filter(function(tasks) {
      return tasks.id !== uniqueId;
    });
    this.saveToLocalStorage();
  },

  deleteCompletedTask: function(id) {
    this.findUniqueId(id);
    this.completedTasksArray = this.completedTasksArray.filter(function(tasks) {
      return tasks.id !== uniqueId;
    });
    this.saveToLocalStorage();
  },

  saveEditedTitle: function(id, newTitle) {
  this.findUniqueId(id);
  this.tasksArray.forEach(function(tasks) {
   if (tasks.id === uniqueId) {
     tasks.title = newTitle;
   }
   });
   this.saveToLocalStorage();
  },

 saveEditedTask: function(id, newBody) {
  this.findUniqueId(id);
  this.tasksArray.forEach(function(tasks) {
    if (tasks.id === uniqueId) {
      tasks.body = newBody;
    }
  });
  this.saveToLocalStorage();
  },

  saveImportanceValue: function(id, newImportance) {
    this.findUniqueId(id);
    this.tasksArray.forEach(function(tasks) {
      if (tasks.id === uniqueId) {
        tasks.importance = newImportance;
      }
    });
    this.saveToLocalStorage();
  },

  saveTaskInNewArray: function(task) {
    this.completedTasksArray.push(task);
  },

  markComplete: function(id, newStatus) {
    this.findUniqueId(id);
    this.tasksArray.forEach(function(tasks) {
      if (tasks.id === uniqueId) {
        tasks.status = newStatus;
        TaskBox.saveTaskInNewArray(tasks);
      }
    });
    this.deleteTaskFromPage(id);
    this.saveToLocalStorage();
  }

};

module.exports = TaskBox;
