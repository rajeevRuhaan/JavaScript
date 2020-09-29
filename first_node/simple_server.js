const http = require('http');

const requestListener = function (request, response) {
  response.writeHead(200);
  response.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(3000);