const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

let numbers = ["Uno", "Dos", "Tres"];
let anotherNumbers = ["One", "Two", "Three"];

// This has been already completed
app.get('/', (req,res) => {
    res.render('index', {title: 'Hey', message: 'Hello there', list: numbers});
});

// You should implement a get request handler that should return the same index.pug
// rendered like in the previous lines of code. This should happen when the path is
// "/another", note that there is no file ending in there.

// The title should be the same, but the message should read "Hello again", and
// the list given to the template should be anotherNumbers.
app.get('/another', (req,res) => {
    res.render('index', {title: 'Hey', message: 'Hello again', list: anotherNumbers});
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
