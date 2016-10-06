
var $titleInput = $('#title-input')
var $bodyInput = $('#body-input')

$(document).ready(function() {
  IdeaBox.getTasksFromLocalStorage();
});

function clearInputFields() {
  $titleInput.val('');
  $bodyInput.val('');
}

var votes = ['None', 'Low', 'Normal', 'High', 'Critical']

function Idea (title, body, id, importance) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || votes[2];
}

function renderToPage(idea) {
  $('.idea-list').prepend(`
  <div id=${idea.id} class="container">
  <h2 contenteditable=true class="idea-title">${idea.title}</h2>
  <button class="delete-button"></button>
  <p contenteditable=true class="idea-body">${idea.body}</p>
  <button class="completed-task">Completed Task</button>
  <button class="up-arrow"></button>
  <button class="down-arrow"></button>
  <p class="idea-importance" >Importance:</p>
  <p class="idea-importance importance-value">${idea.importance}</p>
  </div>`);
}

var IdeaBox = {
  ideasArray: [],

  generateIdea: function() {
    var idea = new Idea ($titleInput.val(), $bodyInput.val());
    this.saveIdeaInArray(idea);
    renderToPage(idea);
    this.saveToLocalStorage();
  },

  saveIdeaInArray: function(idea) {
    this.ideasArray.push(idea);
  },

  saveToLocalStorage: function() {
    localStorage.setItem('ideasArray', JSON.stringify(this.ideasArray));
  },

  getTasksFromLocalStorage: function() {
    var storedIdeasArray = JSON.parse(localStorage.getItem('ideasArray'));
    if (storedIdeasArray) {
      this.ideasArray = storedIdeasArray.map(function(idea) {
        return new Idea(idea.title, idea.body, idea.id, idea.importance);
      });
    }
    this.renderStoredTasksToPage();
  },

  renderStoredTasksToPage: function() {
    var smallArray = this.ideasArray.slice(0, 10);
    smallArray.forEach(function(idea) {
      renderToPage(idea);
    })
  },

//for loop to 10 in array and only show those on page
//function to increase the amount of tasks shown
  // showMoreTasks: function() {
  //   var increaseArray = this.ideasArray.slice(11, 15)
  //   increaseArray.forEach(function(idea) {
  //     IdeaBox.renderIdeaToPage(idea);
  //   })
  // },

  deleteIdeaFromPage: function(id) {
    id = +id;
    this.ideasArray = this.ideasArray.filter(function(ideas) {
      return ideas.id !== id;
    })
    this.saveToLocalStorage();
  },

    saveEditedTitle: function(id, newTitle) {
     id = +id;
     this.ideasArray.forEach(function(ideas) {
       if (ideas.id === id) {
         ideas.title = newTitle;
       }
     })
     this.saveToLocalStorage();
   },

   saveEditedTask: function(id, newBody) {
    id = +id;
    this.ideasArray.forEach(function(ideas) {
      if (ideas.id === id) {
        ideas.body = newBody;
      }
    })
    this.saveToLocalStorage();
  },

  saveImportanceValue: function(id, newImportance) {
    id = +id;
    this.ideasArray.forEach(function(ideas) {
      if (ideas.id === id) {
        ideas.importance = newImportance;
      }
    })
    this.saveToLocalStorage();
  },

}


$('#save-btn').on('click', function() {
  IdeaBox.generateIdea();
  clearInputFields();
});

$('.idea-list').on('click', '.delete-button', function() {
  var ideaId = $(this).parent().attr('id');
  IdeaBox.deleteIdeaFromPage(ideaId);
  $(this).parent().remove();
});

$('.idea-list').on('keyup', '.idea-title', function(idea) {
  var newTitle = $(this).text();
  var ideaId = $(this).parent().attr('id');
  IdeaBox.saveEditedTitle(ideaId, newTitle);
});

$('.idea-list').on('keyup', '.idea-body', function(idea) {
  var newBody = $(this).text();
  var ideaId = $(this).parent().attr('id');
  IdeaBox.saveEditedTask(ideaId, newBody);
});

$('.idea-list').on('click', '.up-arrow', function(idea) {
  var ideaId = $(this).parent().attr('id');
  updateImportance(this, increaseImportance(this));
  var newImportance = $(this).siblings('.importance-value').text();
  IdeaBox.saveImportanceValue(ideaId, newImportance);
});

$('.idea-list').on('click', '.down-arrow', function(idea) {
  var ideaId = $(this).parent().attr('id');
  updateImportance(this, decreaseImportance(this));
  var newImportance = $(this).siblings('.importance-value').text();
  IdeaBox.saveImportanceValue(ideaId, newImportance);
});

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

$('.idea-list').on('click', '.completed-task', function() {
 debugger;
 $(this).parent().css("background-color", "gray")
});

// $('.idea-list').on('keyup', '.idea-body', function(idea) {
//   var ideaId = $(this).parent().attr('id');
//   IdeaBox.saveEditedTask(ideaId);
// });

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
})

$('.show-more-tasks').on('click', function() {
  IdeaBox.showMoreTasks();
})
