const fs  = require('fs');
const http = require('http');
const qs = require('querystring');

const formDocument = fs.readFileSync('form.html', 'utf-8');

// Replace this melodyReverser with your working implementation
function melodyReverser(str) {
  let key = str.split(' ');
  let reversed = key.reverse();
  let join = reversed.join(" ");
  return join;
  }

const requestListener = function (req, res) {

  if(req.method === 'GET') {
    res.writeHead(200);
    res.end(formDocument);
  }

  if(req.method === 'POST') {

    let body = "";

    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function () {
      // Replace the following two lines with your solution
      let key = qs.parse(body);
      let string =key.melody;
      console.log(string);
      let reversekey = melodyReverser(string);
      res.writeHead(200);
      res.end(string + " reversed is " + reversekey);
    });

  }

}

const server = http.createServer(requestListener);
server.listen(3000);