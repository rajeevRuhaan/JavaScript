const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello from the server!');
}

const server = http.createServer(requestListener);
server.listen(3000);