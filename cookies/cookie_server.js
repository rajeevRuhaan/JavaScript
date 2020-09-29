const http = require('http');
const cookie = require('cookie');

http.createServer(function (request, response) {

  let nameCookie1 = cookie.serialize('food', 'pizza');
let nameCookie2 = cookie.serialize('dessert', 'cookie');
 response.setHeader('Set-Cookie', [nameCookie1, nameCookie2]);

  response.writeHead(200);
  response.end('Done setting cookies.' );

}).listen(3000);