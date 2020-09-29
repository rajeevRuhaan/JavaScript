const http = require('http');
const cookie = require('cookie');

http.createServer(function (request, response) {
    let nameCookie = cookie.serialize('countdown', 'one hour', {
    maxAge: 60*60*1
    })
    response.setHeader('Set-Cookie', nameCookie);


    response.writeHead(200);
    response.end('done');
  

}).listen(3000);