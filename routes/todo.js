 var mongoose = require('mongoose');
 var Todo = mongoose.model('Todo');

// GET todo items
exports.index = function(req, res){
  Todo.find(function (err, todos, count){
    res.render('todo', {
      title: 'Todo',
      todos: todos
    });
  });
};

// POST new todo
exports.add = function(req, res){
  new Todo({
    content: req.body.content,
    updated_at: Date.now()
  }).save(function(err, todo, count){
    res.redirect('/todo');
  });
};

// DELETE todo item
exports.delete = function(req, res){
  Todo.findById(req.params.id, function (err, todo){
    todo.remove(function(err, todo){
      res.redirect('/todo');
    });
  });
};