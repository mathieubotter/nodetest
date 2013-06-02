
/*
 * GET todo page.
 */

exports.index = function(req, res){
  res.render('todo', { title: 'Todo' });
};