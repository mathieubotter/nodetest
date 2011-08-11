var express = require('express'),
    app     = express.createServer();

app.get('/', function(req, res){
  res.send('Hello world!');
});

app.listen(process.env.C9_PORT, '0.0.0.0');