const http = require('http');
const fs = require('fs');

let indexDocument = fs.readFileSync('index.html', 'utf-8');

const requestListener = function (request, response) {
  //Open the content.json file here
  //Replace the content in indexDocument by the keys in content.json
let fileContents = fs.readFileSync('content.json', 'utf-8');
let jsonObject = JSON.parse(fileContents);

 indexDocument = indexDocument.replace('pageHeading1',  jsonObject.pageHeading1);
 indexDocument = indexDocument.replace('pageHeading2', jsonObject.pageHeading2);
 indexDocument = indexDocument.replace('pageContent', jsonObject.pageContent);


  response.writeHead(200);
  response.end(indexDocument);
}

const server = http.createServer(requestListener);
server.listen(3000);
