var path = require('path'),
    fs   = require('fs');

function route(handle, pathname, response, postData) {
    console.log('About to route a request for ' + pathname);
    
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, postData);
    } else {
        var filepath = 'www' + pathname;

        var extname = path.extname(filepath);
        var contentType = 'text/html';
        switch(extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
        }
        
        path.exists(filepath, function(exists) {
            if (exists) {
                fs.readFile(filepath, function(error, content) {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    } else {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    }
                });
            } else {
                console.log("No request handler found for " + pathname);
                
                fs.readFile('www/404.html', function(error, content) {
                    response.writeHead(404, {"Content-Type": "text/html"});
                    response.write(content);
                    response.end();
                });
            }
        });
    }
}

exports.route = route;