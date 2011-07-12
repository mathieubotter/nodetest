function index(response) {
    console.log("Request handler 'index' was called.");
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Hello Index');
    response.end();
}

function test(response) {
    console.log("Request handler 'test' was called.");
    
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello Test');
    response.end();
}

exports.index = index;
exports.test = test;