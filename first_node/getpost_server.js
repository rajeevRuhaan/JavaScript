const http = require('http');

const htmlContent =
  '<html><head><title>Printing Post Data</title></head>' +
  '<body>' +
  '  <form method="post">' +
  '   Your name: <input name="username"><br>' +
  '   <input type="submit">' +
  ' </form>' +
  '</body></html>';

const requestListener = function (req, res) {

  let body = '';

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    console.log('Data received: ' + body);

    res.writeHead(200);
    res.end(htmlContent);
  });
}

const server = http.createServer(requestListener);
server.listen(3000);