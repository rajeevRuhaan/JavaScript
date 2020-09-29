const fs = require( 'fs');
let fileContents = fs.readFileSync( 'major.json', 'utf-8');
console.log(fileContents);
let majorScale = JSON.parse(fileContents);
console.log(majorScale);
console.log(majorScale[2]);
console.log(fileContents[0]);

let content = 'Hello files!';

fs.writeFileSync('hello.txt', content);

try{
fs.writeFileSync('.', content);
} catch (err) {
  console.log('Something went wrong');
  console.error(err);
}

let someScale = {};
someScale.scaleName = "minor";
someScale.notes = ['A#', 'C', 'C#', 'D#', 'F', 'F#', 'G#', 'A#'];

let scaleAsJson = JSON.stringify(someScale, null, " ");
fs.writeFileSync("scale.json", scaleAsJson);
