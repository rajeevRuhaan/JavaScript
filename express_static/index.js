const express = require('express');
const app = express();
const port = 3000;

// Implement serving static files from the "json" directory
// They should be loaded when the path starts with "assets"
// So a request to http://localhost:3000/major.json should
// return the contents of "json/major.json"
app.use('/assets', express.static('json'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
