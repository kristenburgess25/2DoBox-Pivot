var $ = require('jquery');

var votes = ['None', 'Low', 'Normal', 'High', 'Critical'];

function Task (title, body, id, importance, status) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || votes[2];
  this.status = status || "incomplete";
}

module.exports = Task;
