let keyboardDiv = document.getElementById('simple-keyboard');
let notesRecorded = document.getElementById('notes-recorded');
let startRecordingButton = document.getElementById('start-recording');
let stopRecordingButton = document.getElementById('stop-recording');

let synth;
let recording = false; // This is a "flag" that keeps track wether we are recording or note

let notes = []; // This will hold the notes that the user has clicked

function startRecording() {
  // Empty out notes array, clear recorded notes and start recording
  notes = [];
  clearList();
  startRecordingButton.classList.add('recording');
  recording = true;
}
function stopRecording() {
  // Turn recording off, and write the notes
  recording = false;
  startRecordingButton.classList.remove('recording');
  writeNotes();
}

function playNote(evt) {
  // Find out the note that was played from the data attribute
  let note = evt.target.dataset.note;

  // This will create a new synth or if it exists already do nothing
  synth = synth || new Tone.Synth().toMaster()

  // Play the note in the browser
  synth.triggerAttackRelease(note, '8n');

  // If the note is defined, add it to an array of notes
  if(note !== undefined && recording) {
    notes.push(note)
  }

}

function clearList() {
  // Empty the notesRecorded list
  while(notesRecorded.firstChild) {
    notesRecorded.removeChild(notesRecorded.firstChild);
  }
}

function writeNotes() {
  // First clear out the (previously) recorded notes
  clearList();

  // This has been added to recorder.html
  let noteNamesInput = document.getElementById('note-names');
  noteNamesInput.value = ''; //Clear the value of the input

  // Create list items for notes and add them to #notes-recorded
  for (var i = 0; i < notes.length; i++) {
    let noteElement = document.createElement('li');
    noteElement.innerText = notes[i];
    notesRecorded.appendChild(noteElement);

    // Add each note to the input and add a space between them
    noteNamesInput.value += notes[i] + " ";
  }


}

// Attach event listeners
keyboardDiv.addEventListener('click', playNote);
startRecordingButton.addEventListener('click', startRecording);
stopRecordingButton.addEventListener('click', stopRecording);