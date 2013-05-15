
/*
 * GET threejs page.
 */

exports.index = function(req, res){
  res.render('threejs', { title: 'Three.js lab' });
};