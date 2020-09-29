const fs = require('fs');
const http = require('http');
const static = require('node-static');
const fileServer = new static.Server();

const indexDocument = fs.readFileSync('index.html', 'utf-8');

const requestListener = function (request, response) {

  // Serve static files.
  if (request.method === 'GET' &&
    ( request.url.startsWith('/json/') || request.url.startsWith('/assets/'))) {
    fileServer.serve(request, response);

  // Serve dynamic index-page.
  } else if (request.method === 'GET' && request.url === '/') {
    // Following retrieves file names in json-directory.
    fs.readdir('json', function (error, fileNames) {
      if (error) {
        response.writeHead(500);
        response.end(error);
      } else {
        const documentParts = indexDocument.split('|links|');

        let jsonLinks = '';
        for (var i = 0; i < fileNames.length; i++) {
          jsonLinks += '<li><a href="json/' + fileNames[i] + '">' + fileNames[i] + '</a></li>';
        }
        response.writeHead(200);
        response.end(documentParts[0] + jsonLinks + documentParts[1]);
      }
    });
  }
}
const server = http.createServer(requestListener);
server.listen(3000);