var mongoose = require('mongoose');
var todoSchema   = mongoose.schema;

var Todo = new Schema({
	user_id    : String,
	content    : String,
	updated_at : Date
});

mongoose.model('Todo', Todo);

mongoose.connect('mongodb://localhost/nodetest-todo');