const http = require('http');
const cookie = require('cookie');
const static = require('node-static');

const file = new static.Server();

http.createServer(function (request, response) {
  if(request.method === 'GET' && request.url === '/') {
    file.serve(request, response);
  }

  if(request.method === 'GET' && request.url === '/one_cookie.html') {
    // Set one cookie here
    let firstCookie = cookie.serialize('first', 'first', {maxAge: 86400});
    response.setHeader('Set-Cookie', firstCookie);

    file.serve(request, response);

  }
  if(request.method === 'GET' && request.url === '/two_cookies.html') {
    // Set two cookies here
    let cookies = cookie.serialize('cookies=just', {maxAge: 86400});
    let secondCookie = cookie.serialize('second=second', {maxAge: 86400});
    response.setHeader('Set-Cookie', [cookies, secondCookie]);
    
   
    file.serve(request, response);
  
  }
}).listen(3000);