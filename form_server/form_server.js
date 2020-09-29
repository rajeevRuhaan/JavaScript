const fs  = require('fs');
const http = require('http');
var qs = require('querystring');


const formDocument = fs.readFileSync('form.html', 'utf-8');


const requestListener = function (req, res) {
  // Complete the requestListener function.
  // You don't have to edit the rest of the file.
  if(req.method === 'GET') {
    res.writeHead(200);
    res.end(formDocument);
  }

  if(req.method === 'POST') {
      let data = 'You POSTed the following data: ';
  
      req.on('data', function (chunk) {
        data += chunk;
      });
  
      req.on('end', function () {
        //console.log('You POSTed the following data: ' + data);
        res.writeHead(200);
        res.end(data);
      });
    }
    
}

const server = http.createServer(requestListener);
server.listen(3000);