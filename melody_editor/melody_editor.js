let playMelodyButton = document.getElementById('play-melody');
let notesToEditInput = document.getElementById('notes-to-edit');
let editButton = document.getElementById('edit-button');

let editorArea = document.getElementById('editor-area');

playMelodyButton.addEventListener('click', startPlaying);
editButton.addEventListener('click', createNotesToEdit);

// Start here, fill in the function so that it empties out '#editor-area'
function clearEditorArea() {
let editorArea = document.getElementById('editor-area');
let contentToErase = editorArea.childNodes;

  contentToErase[1].remove();
  contentToErase[2].remove();
  contentToErase[3].remove();
}

function splitNotes(element) {
let elementValue = element.value;
let splitIt = elementValue.split(' ');
return splitIt;
}

function createNoteToEdit(note) {
  let noteContainer = document.createElement('div');
    noteContainer.setAttribute('class','note-container');
    document.body.appendChild(noteContainer);

let buttonUp = document.createElement('button');
    buttonUp.className = 'transpose-up';
    buttonUp.innerText = '^';

let newLine = document.createElement('br');

let input = document.createElement('input');
    input.type = 'text';
    input.className = 'note';
    input.size = '2';
    input.setAttribute('value', note);

let select = document.createElement('select');
    select.setAttribute('class', 'note-length');

let option8 = document.createElement('option');
    option8.setAttribute('value', '8');
    option8.innerHTML = 'eighth note';

let option4 = document.createElement('option');
    option4.setAttribute('value', '4');
    option4.innerHTML = 'quater note';

let option2 = document.createElement('option');
    option2.setAttribute('value', '2');
    option2.innerHTML = 'half note';

let option1 = document.createElement('option');
    option1.setAttribute('value', '1');
    option1.innerHTML = 'whole note';

let buttonDown = document.createElement('button');
    buttonDown.className = 'transpose-down';
    buttonDown.innerText = 'v';



let container = document.querySelector('.note-container');
    container.append(buttonUp, newLine, input, 
    select, newLine, buttonDown);

let noteLength = document.querySelector('.note-length');
noteLength.append(option8, option4, option2, option1);

    return container;

}

function createNotesToEdit() {


}

function handleNoteContainerEvent(evt) {

}

// This function has been completed, you do not need to edit it
function getMelodyString(containers) {
  let melodyString = ''

  for (var i = 0; i < containers.length; i++) {
    melodyString += containers[i].querySelector('.note').value;
    melodyString += '/';
    melodyString += containers[i].querySelector('.note-length').value;
    melodyString += ' ';
  }

  return melodyString;
}

// This function has been completed, you do not need to edit it
function startPlaying() {
  let noteContainers = document.querySelectorAll('#editor-area .note-container');
  let melody = getMelodyString(noteContainers);
  const player = new SimplePlayer();
  const sequenceParser = new SequenceParser(128, [2, 4]);
  player.play(sequenceParser.parse([
      melody
  ]));
}

clearEditorArea();

