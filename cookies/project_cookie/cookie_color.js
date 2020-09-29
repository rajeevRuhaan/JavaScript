const http = require('http');
const cookie = require('cookie');
const static = require('node-static');
const qs = require('querystring');

const file = new static.Server();

const requestListener = function (req, res) {
  if(req.method === 'GET') {
    file.serve(req, res);
  }

  if(req.method === 'POST') {

    let body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function() {
      /*  Read the posted data here and set a cookie with key
          of 'color' and the value to match what was posted
          from the form in color_select.
      */

     let colorSelect = qs.parse(body).color_select;
     console.log(colorSelect);
     let requestColor = cookie.serialize('color',  colorSelect );
     //console.log(requestColor);
     res.setHeader('Set-Cookie', requestColor);

     res.writeHead(301, {Location: '/'} );

      res.end();
    });
  }

}

const server = http.createServer(requestListener);
server.listen(3000);
