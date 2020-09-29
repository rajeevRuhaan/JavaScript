const fs = require('fs');
const http = require('http');

const formDocument = fs.readFileSync('form.html', 'utf-8');
const thankYouDocument = fs.readFileSync('thank_you.html', 'utf-8');

const requestListener = function(req, res) {
  if (req.method === 'GET'){
    res.writeHead(200);
    res.end(formDocument);
  }

  if (req.method === 'POST') {
    let data = '';

    req.on('data', function (chunk) {
      data += chunk;
    });

    req.on('end', function () {

      console.log(data);
      res.writeHead(200);
      res.end(thankYouDocument);
    });
  }
}

const server = http.createServer(requestListener);
server.listen(3000);