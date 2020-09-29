const fs  = require('fs');

const htmlDocument = fs.readFileSync('html_document.html', 'utf-8');

console.log(htmlDocument);