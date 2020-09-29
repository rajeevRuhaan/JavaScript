const static = require('node-static');
const http = require('http');

const file = new static.Server();

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response, function (error) {
            if (error && error.status === 404) {
                file.serveFile('/not_found.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(3000);