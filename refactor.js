var $titleInput = $('#title-input')
var $bodyInput = $('#body-input')

$(document).ready(function() {
  IdeaBox.getIdeaFromLocalStorage();
});

function Idea (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || 'swill';
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
    $('.idea-list').prepend(`<div id=${idea.id} class="container">
    <h2 contenteditable=true class="idea-title">${idea.title}</h2>
    <button class="delete-button"></button>
    <p contenteditable=true class="idea-body">${idea.body}</p>
    <button class="up-arrow"></button>
    <button class="down-arrow"></button>
    <p class="idea-quality">quality: ${idea.quality}</p></div>`)
  },

  saveToLocalStorage: function() {
    localStorage.setItem('ideasArray', JSON.stringify(this.ideasArray));
  },

  getIdeaFromLocalStorage: function() {
    var storedIdeasArray = JSON.parse(localStorage.getItem('ideasArray'));
    if (storedIdeasArray) {
      this.ideasArray = storedIdeasArray.map(function(idea) {
        return new Idea(idea.title, idea.body, idea.id, idea.quality);
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

  saveEditedTitle: function(id) {
   id = +id;
   this.ideasArray.forEach(function(ideas) {
     debugger
     if (ideas.id === id) {
       debugger
       ideas.title = $('.idea-title').text();
     }
   })
   this.saveToLocalStorage();
 },

 saveEditedTask: function(id)
}

$('#save-btn').on('click', function() {
  IdeaBox.generateIdea();
});

$('.idea-list').on('click', '.delete-button', function() {
  var ideaId = $(this).parent().attr('id');
  IdeaBox.deleteIdeaFromPage(ideaId);
  $(this).parent().remove();
});

$('.idea-list').on('keyup', '.idea-title', function(idea) {
  var ideaId = $(this).parent().attr('id');
  IdeaBox.saveEditedTitle(ideaId);
  debugger
})
