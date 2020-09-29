const http = require('http');
const fs = require('fs');

const indexDocument = fs.readFileSync('index.html', 'utf-8');
const anotherDocument = fs.readFileSync('another.html', 'utf-8');

function requestListener(request, response) {

  if(request.method === 'GET') {
    if(request.url === '/' || request.url === '/index.html') {
      // You need to load the counter.json here
      // and increment "index" by one and save it
      let indexCounter = fs.readFileSync('counter.json', 'utf-8');
      let indexContent = JSON.parse(indexCounter);
      ++indexContent.index;
      console.log(indexContent);
      let incrementIndexContent = JSON.stringify(indexContent);
      let newIndexCounter = fs.writeFileSync('counter.json', incrementIndexContent);


      // You need to replace the '-!-' in index.html with
      // the new count before serving the document
      let newIndexDocument = indexDocument.replace('-!-', indexContent.index);

      response.writeHead(200);
      response.end(newIndexDocument);
    } else if (request.url ==='/another.html') {

      // You need to load the counter.json here
      // and increment "another" by one and save it
      let anotherCounter = fs.readFileSync('counter.json', 'utf-8');
      let anotherContent = JSON.parse(anotherCounter);

      ++anotherContent.another;
      console.log(anotherContent);
      let incrementAnotherContent = JSON.stringify(anotherContent);
      let newAnotherCounter = fs.writeFileSync('counter.json', incrementAnotherContent);

      // You need to replace the '-!-' in another.html
      // the new count before serving the document
      let newAnotherDocument = anotherDocument.replace('-!-', anotherContent.another);

      response.writeHead(200);
      response.end(newAnotherDocument);
    } else {
      response.writeHead(404);
      response.end('File not found.');
    }
  }
}

const server = http.createServer(requestListener);
server.listen(3000);
