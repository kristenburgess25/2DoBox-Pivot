
var $titleInput = $('#title-input')
var $bodyInput = $('#body-input')

$(document).ready(function() {
  IdeaBox.getIdeaFromLocalStorage();
});

var votes = ['None', 'Low', 'Normal', 'High', 'Critical']

function Idea (title, body, id, importance) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || votes[2];
}

var IdeaBox = {
  ideasArray: [],

  generateIdea: function() {
    var idea = new Idea ($titleInput.val(), $bodyInput.val());
    this.saveIdeaInArray(idea);
    this.renderIdeaToPage(idea);
    this.saveToLocalStorage();
  },

  saveIdeaInArray: function(idea) {
    this.ideasArray.push(idea);
  },

  renderIdeaToPage: function(idea) {
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
    </div>`)
  },

  saveToLocalStorage: function() {
    localStorage.setItem('ideasArray', JSON.stringify(this.ideasArray));
  },

  getIdeaFromLocalStorage: function() {
    var storedIdeasArray = JSON.parse(localStorage.getItem('ideasArray'));
    if (storedIdeasArray) {
      this.ideasArray = storedIdeasArray.map(function(idea) {
        return new Idea(idea.title, idea.body, idea.id, idea.importance);
      });
    }
    this.renderStoredIdeasToPage();
  },

  renderStoredIdeasToPage: function() {
    this.ideasArray.forEach(function(idea) {
      IdeaBox.renderIdeaToPage(idea);
    })
  },

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
        ideas.importance = newimportance;
      }
    })
    this.saveToLocalStorage();
  },

}

function clearInputFields() {
  $titleInput.val('');
  $bodyInput.val('');
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
  debugger
  var currentImportance = $(this).siblings('.importance-value').text();
  var arrayNumber = votes.indexOf(currentImportance);
  var increaseVote = arrayNumber++
  var newImportance = votes[arrayNumber];
  IdeaBox.saveImportanceValue(ideaId, newImportance);
});

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
