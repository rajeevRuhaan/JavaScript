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
      let data = '';
  
      req.on('data', function (chunk) {
        data += chunk;
      });
  
      req.on('end', function () {
      let postedData = qs.parse(data);
      let number_1 = parseInt(postedData.number_1);
      let number_2 = parseInt(postedData.number_2);
      let adding_number = number_1 +number_2;
      console.log(adding_number);
        res.writeHead(200);
        res.end('That adds up to: ' + adding_number);
      });
    }

}

const server = http.createServer(requestListener);
server.listen(3000);
