function index() {
    console.log("Request handler 'index' was called.");
    
    return 'Hello Index';
}

function test() {
    console.log("Request handler 'test' was called.");
    
    return 'Hello Test';
}

exports.index = index;
exports.test = test;