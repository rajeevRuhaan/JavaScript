let sequence;
var synth;

const form = document.getElementById('synth-form');
form.addEventListener('submit', playSounds);
const stop = document.getElementById('stop');
const tempoSlider = document.getElementById('tempo');
let tempoValue = 1.0

tempoSlider.addEventListener('change', function(e){
  sequence.playbackRate = tempoSlider.value/10;
});

const defaultSynth = new Tone.Synth().toMaster();
const membraneSynth = new Tone.MembraneSynth().toMaster();
const pluckSynth = new Tone.PluckSynth().toMaster();

function stopPlaying(e) {
  Tone.Transport.stop();
  defaultSynth.triggerRelease();
  try{
    sequence.dispose();
  } catch {};      
}

stop.addEventListener('click', stopPlaying);

function playSounds(event) {
  stopPlaying();
  var selectedSynth = document.getElementById('synth-select').value;
  
  const noteLength = form.elements['note-length'].value;
  const notes = form.elements['notes-to-play'].value.split(' ');
  
  sequence = new Tone.Sequence(
    function(time, note) {
      switch (selectedSynth){
        case 'default-synth':
          defaultSynth.triggerAttackRelease(note, time);
          break;
        case 'membrane-synth':
          membraneSynth.triggerAttackRelease(note, "10Hz", time);
          break;
        case 'pluck-synth':
          pluckSynth.triggerAttackRelease(note, time);
          break;              
        default:
          console.log("Unknown synth", selectedSynth);
      }        
    }, 
    notes,
    noteLength
  );
  sequence.playbackRate = tempoSlider.value/10;
  sequence.start();

  Tone.Transport.start();

  event.preventDefault();
}