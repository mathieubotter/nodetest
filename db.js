var mongoose = require('mongoose');

var Todo = new mongoose.Schema({
	user_id    : String,
	content    : String,
	updated_at : Date
});

mongoose.model('Todo', Todo);

mongoose.connect('mongodb://localhost/nodetest-todo');