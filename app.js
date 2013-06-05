
/**
 * Module dependencies.
 */

var express = require('express'),
    engine = require('ejs-locals'),
    db = require('./db'),
    home = require('./routes'),
    about = require('./routes/about'),
    todo = require('./routes/todo'),
    threejs = require('./routes/threejs'),
    http = require('http'),
    path = require('path');

var app = express();

// use ejs-locals for all ejs templates
app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
app.use('/todo', todo.current_user);
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.index);
app.get('/about', about.index);
app.get('/threejs', threejs.index);

// Todo list
app.get('/todo', todo.index);
app.post('/todo/add', todo.add);
app.get('/todo/edit/:id', todo.index);
app.post('/todo/edit/:id', todo.edit);
app.get('/todo/delete/:id', todo.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});