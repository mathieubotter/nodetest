 var mongoose = require('mongoose');
 var Todo = mongoose.model('Todo');
 var utils = require('connect').utils;

// GET todo items
exports.index = function(req, res, next){
  var user_id = req.cookies ? req.cookies.user_id : undefined;

  if(req.params.id !== undefined){
    Todo
      .find({ user_id: user_id })
      .sort('-updated_at')
      .exec(function (err, todos, count){
        if(err) return next(err);

        res.render('todo', {
          title: 'Edit todo',
          todos: todos,
          current: req.params.id
        });
      });
  } else {
    Todo
      .find({ user_id: user_id })
      .sort('-updated_at')
      .exec(function (err, todos){
        if(err) return next(err);

        res.render('todo', {
          title: 'Todo',
          todos: todos,
          current: null
        });
      });
  }
};

// POST new todo
exports.add = function(req, res, next){
  new Todo({
    user_id: req.cookies.user_id,
    content: req.body.content,
    updated_at: Date.now()
  }).save(function(err, todo, count){
    if(err) return next(err);

    res.redirect('/todo');
  });
};

// Edit todo item
exports.edit = function(req, res, next){
  Todo.findById(req.params.id, function(err, todo){
    var user_id = req.cookies ? req.cookies.user_id : undefined;

    if (todo.user_id !== user_id){
      return utils.forbidden(res);
    }

    todo.content = req.body.content;
    todo.updated_at = Date.now();
    todo.save(function(err, todo, count){
      if(err) return next(err);

      res.redirect('/todo');
    });
  });
};

// DELETE todo item
exports.destroy = function(req, res, next){
  Todo.findById(req.params.id, function (err, todo){
    var user_id = req.cookies ? req.cookies.user_id : undefined;

    if(todo.user_id !== user_id){
      return utils.forbidden(res);
    }

    todo.remove(function(err, todo){
      if(err) return next(err);

      res.redirect('/todo');
    });
  });
};

exports.current_user = function(req, res, next){
  var user_id = req.cookies ? req.cookies.user_id : undefined;

  if(!user_id){
    res.cookie('user_id', utils.uid(32));
  }

  next();
};