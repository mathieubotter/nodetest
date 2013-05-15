
/**
 * Module dependencies.
 */

var express = require('express'),
    engine = require('ejs-locals'),
	home = require('./routes'),
    about = require('./routes/about'),
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
app.use(express.cookieParser('your secret here'));
app.use(express.session());
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});