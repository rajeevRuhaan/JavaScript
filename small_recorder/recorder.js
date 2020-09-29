/*

  You should write your functions and other code in this file.

  You are not allowed to modify the recorder.html

  You are given a partial playNote function, that works as an event handler,
  and by default plyas sounds when the function is attached to the buttons.

  You will need to write the rest of the code (whatever functions and variables that you need)
  and attach the event handlers were necessary.
*/
let synth;
function playNote(evt) {
  // These lines are given
  let note = evt.target.dataset.note;
  synth = synth || new Tone.Synth().toMaster()
  synth.triggerAttackRelease(note, '8n');

  //You need to complete this function here, to record the played notes to an array
}
function noterecorded(){

}