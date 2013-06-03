
/*
 * GET todo page.
 */

 var mongoose = require('mongoose');
 var Todo = mongoose.model('Todo');

exports.index = function(req, res){
  res.render('todo', { title: 'Todo' });
};

exports.add = function(req, res){
	new Todo({
		content    : req.body.content,
		updated_at : Date.now()
	}).save(function(err, todo, count){
		res.redirect('/todo');
	});
};