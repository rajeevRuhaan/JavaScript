
/**
 * Write the code to add buttons inside #simple-keyboard after this comment:
 *-------------------------------------------------------------------------*/
var myDiv = document.getElementById("simple-keyboard");
let G4button = document.createElement('button');
G4button.setAttribute('id', 'G4');
G4button.innerText = "G4";
myDiv.appendChild(G4button);

let Bb4button = document.createElement('button');
Bb4button.setAttribute('id', 'Bb4');
Bb4button.innerText = "Bb4";
myDiv.appendChild(Bb4button);

let C5button = document.createElement('button');
C5button.setAttribute('id', 'C5');
C5button.innerText = "C5";
myDiv.appendChild(C5button);

let D5button = document.createElement('button');
D5button.setAttribute('id', 'D5');
D5button.innerText = "D5";
myDiv.appendChild(D5button);

let F5bbutton = document.createElement('button');
F5bbutton.setAttribute('id', 'F5');
F5bbutton.innerText = "F5";
myDiv.appendChild(F5bbutton);

let G5button = document.createElement('button');
G5button.setAttribute('id', 'G5');
G5button.innerText = "G5";
myDiv.appendChild(G5button);

console.log(myDiv);


/*-------------------------------------------------------------------------
 * The following code will automatically find any buttons you have inserted
 * and enable to play notes by clicking them. You don't need to change
 * anything here.
 */
let synth = undefined;

function playNote(event) {
  let id = event.target.getAttribute('id');
  if (id === null) {
    console.warn('The button did not have an id-attribute!');
  }
  synth = synth || new Tone.Synth().toMaster();
  synth.triggerAttackRelease(id, '4n');
}

function watchForClick(element) {
  if (element.nodeName === 'BUTTON') {
    element.addEventListener('click', playNote);
  } else {
    console.warn('Found an element inside #simple-keyboard that is not a button!');
  }
}

Array.from(document.getElementById('simple-keyboard').children).forEach(watchForClick);
