function index() {
    console.log("Request handler 'index' was called.");
}

function test() {
    console.log("Request handler 'test' was called.");
}

exports.index = index;
exports.test = test;