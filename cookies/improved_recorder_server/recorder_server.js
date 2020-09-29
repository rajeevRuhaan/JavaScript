const fs  = require('fs');
const http = require('http');
const qs = require('querystring');
const static = require('node-static');
const cookie = require('cookie');

const recorderDocument = fs.readFileSync('recorder.html', 'utf-8');
const playerDocument = fs.readFileSync('player.html', 'utf-8');

const fileServer = new static.Server();

const requestListener = function (request, response) {

  // Serve static files.
  // TODO: Serve files from json-directory too.
  if(request.method === 'GET' && request.url.startsWith('/assets/')) {
    
    fileServer.serve(request, response);
  }
  else if(request.method === 'GET' && request.url.startsWith('/json/')) {
    
    fileServer.serve(request, response);
  }

  // Serve dynamic recorder-page.
  else if (request.method === 'GET' && request.url === '/') {
    // Following retrieves file names in json-directory.
    fs.readdir('json', function (error, fileNames) {
      if (error) {
        response.writeHead(500);
        response.end(error);
      } else {
        // TODO: Replace following two lines in order to split the document
        // and insert fileNames in the middle. All files must be separated
        // from each other with '</option><option>' in between.
        
       //console.log(fileNames);
        let joinFile = fileNames.join('</option><option>');
        console.log(joinFile);
        let recordedNotes = recorderDocument.replace('-!-', joinFile);
        
        response.writeHead(200);
       
        response.end(recordedNotes);
      }
    });
  }

  // Handle POST-requests.
  else if (request.method === 'POST') {
    let body = "";
    request.on('data', function (chunk) {
      body += chunk;
    });
    request.on('end', function () {
      let query = qs.parse(body);
      
      // TODO: Set cookie 'notes' using Set-Cookie -header
      // that has as content the posted note names.
      //var queryNotes = JSON.parse(JSON.stringify(query.note_names));
     // console.log(queryNotes);
     
     let setCookie = cookie.serialize('notes', query.note_names);
     response.setHeader('Set-Cookie', setCookie);

      const documentParts = playerDocument.split('-!-');
      response.writeHead(200);
      response.end(documentParts[0] + query.note_names + documentParts[1]);
    });
  }

  // Server should respond with not found in other cases.
  else {
    response.writeHead(404);
    response.end('404 Not found.');
  }
};

const server = http.createServer(requestListener);
server.listen(3000);
