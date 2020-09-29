const fs  = require('fs');
const http = require('http');
const qs = require('querystring');

const recorderDocument = fs.readFileSync('recorder.html', 'utf-8');
const recorderCss = fs.readFileSync('recorder.css', 'utf-8');
const recorderJs = fs.readFileSync('recorder.js', 'utf-8');
const toneLibraryJs = fs.readFileSync('Tone-muted.js', 'utf-8');

const playerDocument = fs.readFileSync('player.html', 'utf-8');
const playerJs = fs.readFileSync('player.js', 'utf-8');
const simplePlayerJs = fs.readFileSync('SimplePlayer.js', 'utf-8');

const requestListener = function (req, res) {

  if(req.method === 'GET') {

    // Serve a resource based on the url
    // Note that this is not particularly good method for doing this
    // We'll discuss alternatives on the next round
    if(req.url === '/') {
      res.writeHead(200);
      res.end(recorderDocument);
    } else if (req.url === '/recorder.css') {
      res.writeHead(200);
      res.end(recorderCss);
    } else if (req.url === '/recorder.js') {
      res.writeHead(200);
      res.end(recorderJs);
    } else if (req.url === '/Tone-muted.js') {
      res.writeHead(200);
      res.end(toneLibraryJs);
    } else if (req.url === '/player.js') {
      res.writeHead(200);
      res.end(playerJs);
    } else if (req.url === '/SimplePlayer.js') {
      res.writeHead(200);
      res.end(simplePlayerJs);
    }


  }

  if(req.method === 'POST') {

    let body = "";

    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function () {
      // You should replace the following two lines with your solution
      let notes = qs.parse(body).note_names;
      let recordedNotes = playerDocument.replace("-!-" , notes);
      console.log(recordedNotes);
      res.writeHead(200);
      res.end(recordedNotes);
    });

  }

}

const server = http.createServer(requestListener);
server.listen(3000);