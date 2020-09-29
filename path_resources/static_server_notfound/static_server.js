const static = require('node-static');
const http = require('http');

const file = new static.Server();

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(3000);