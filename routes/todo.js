 var mongoose = require('mongoose');
 var Todo = mongoose.model('Todo');

// GET todo items
exports.index = function(req, res){
  if(req.params.id !== null){
    Todo
      .find()
      .sort('-updated_at')
      .exec(function (err, todos, count){
        res.render('todo', {
          title: 'Edit todo',
          todos: todos,
          current: req.params.id
        });
      });
  } else {
    Todo
      .find()
      .sort('-updated_at')
      .exec(function (err, todos, count){
        res.render('todo', {
          title: 'Todo',
          todos: todos,
          current: null
        });
      });
  }
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

// Edit todo item
exports.edit = function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    todo.content = req.body.content;
    todo.updated_at = Date.now();
    todo.save(function(err, todo, count){
      res.redirect('/todo');
    });
  });
};

// DELETE todo item
exports.destroy = function(req, res){
  Todo.findById(req.params.id, function (err, todo){
    todo.remove(function(err, todo){
      res.redirect('/todo');
    });
  });
};