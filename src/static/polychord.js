//create synth
const poly = new Tone.PolySynth(10, Tone.Synth, {
  oscillator: {
    type: "triangle"
  }
}).toMaster();

var metronomeToggle = false;
var bpm = 88;
var audio = new Audio(metronomeSoundPath);
var metronomeTimeout;

function toggleBPM(){
	console.log("test");
	var parseBpm = document.getElementById("metroNum").value;
	console.log(parseBpm);
	if(parseBpm != bpm){
		bpm = parseBpm;
		metronomeToggle = false;
	}
	if(metronomeToggle == false){
		metronomeToggle = true;
		startMetronome();
	}
	else{
		metronomeToggle = false;
		stopMetronome();
	}
}

function startMetronome(){
	var rate = 60000/bpm;
	console.log(rate);
	metronomeTimeout = setTimeout(playMetronomeSound, rate);
}

function stopMetronome(){
	clearTimeout(metronomeTimeout);
}

function playMetronomeSound(){
	console.log("in play");
	audio.play();
	startMetronome();
}

//get all keys
var temp = document.querySelectorAll(".key");
//create array of valid key inputs
var pianoKeycodes = [];
for (i = 0; i < temp.length; i++) {
  pianoKeycodes.push(temp[i].dataset.keycode);
}

//-- keyboard controller logic --
//keeps track of which keys are currently pressed
const keysPressed = [];
//keeps track of if sustain is held
var sustain = false
//keeps track of sustained keys
const sustainKeys = []

//-- parse chords csv --
//create array to hold chord information
const chords = [];
//begin parse of the chord file
Papa.parse(csvPath, {
  delimiter: ",",
  header: true,
  download: true,
  comments: "#",

  //processing for each line
  step: function(results) {
    //- interval processing -
    //parse intervals into an array
    var intervals = Papa.parse(results.data.intervals, {
      delimiter: "-"
    }).data[0];
    //mudolo intervals by 12 to fix compound intervals
    intervals = intervals.map(e => e % 12);
    //remove duplicates by transforming into a set
    intervals = new Set(intervals);
    //store processed intervals
    results.data.intervals = intervals;

    //push result of parse to chords array
    chords.push(results.data);

    //log errors if encountered
    if (results.errors != "") {
      console.log(results.errors);
    }
  },
  
  //log confirmation upon completion
  complete: function() {
    console.log("Chord Parsing Complete");
  }
});

//add listener for key presses
document.addEventListener("keydown", e => {
  //if key is a piano key code play the note
  if (pianoKeycodes.includes(e.code.toString())) {
    playNote(e.code.toString())
  }
  //if key is space set sustain to true
  else if (e.code.toString() == "Space") {
    sustain = true
  }
});

//add listener for key releases
document.addEventListener("keyup", e => {
  //if key is a piano key code stop the note
  if (pianoKeycodes.includes(e.code.toString())) {
    stopNote(e.code.toString())
  }
  //if key is space set sustain to false and release sustained keys
  else if (e.code.toString() == "Space") {
    sustain = false
    sustainKeys.forEach(stopNote)
    sustainKeys.length = 0
  }
});

//plays the note corresponding to the keycode of e
function playNote(keycode) {
  //dont trigger if key is already pressed
  if (!keysPressed.includes(keycode)) {
    //push keycode to pressed
    keysPressed.push(keycode);
    //get respective key from keycode
    var key = document.querySelector(".key[data-keycode=\"" + keycode + "\"]");
    //add playing transform to respective note
    key.classList.add("playing");
    //play note
    poly.triggerAttack(key.dataset.note + key.dataset.octave);
    //display note/chord being played
    document.querySelector(".currentNote").innerHTML = getChord();
    return key.dataset.note + key.dataset.octave;
  }
}

//releases the note to corresponding the keycode of e
function stopNote(keycode) {
  //remove key from pressed
  keysPressed.splice(keysPressed.indexOf(keycode), 1);
  //if sustain isn't held stop playing note
  if(!sustain) {
    //get respective key from keycode
    var key = document.querySelector(".key[data-keycode=\"" + keycode + "\"]");
    //remove playing transform from respective key
    key.classList.remove("playing");
    //release note
    poly.triggerRelease(key.dataset.note + key.dataset.octave);
    return key.dataset.note + key.dataset.octave;
  }
  //sustain is held; store note in sustain keys
  else {
    sustainKeys.push(keycode);
  }
  //display note/chord being played
  document.querySelector(".currentNote").innerHTML = getChord();
}

//gets the currently playing chord; returns blank on no match
function getChord() {
  //get all playing keys
  var keys = document.querySelectorAll(".key.playing");

  //if less than 2 keys there is no chord, return blank
  if (keys.length < 2) {
    return "";
  }

  //get bass note (lowest playing note)
  var bass = keys[0].dataset.note;
  //get indicies of currently playing notes
  var indicies = [];
  for (i = 0; i < keys.length; i++) {
    indicies.push(keys[i].dataset.pos);
  }

  //test every note as a potential root in order
  for (i = 0; i < keys.length; i++) {
    //set current root to test
    var root = i;

    //get intervals of all notes from root; stored as a set
    let intervals = new Set();
    for (j = 0; j < indicies.length; j++) {
      //get interval between root and current note
      //if current note is < root shift it an octave up for calculations
      if ((indicies[j] % 12) < (indicies[root] % 12)) {
        var interval = Math.abs(((indicies[j] % 12) + 12) - (indicies[root] % 12));
      }
      else {
        var interval = Math.abs((indicies[j] % 12) - (indicies[root] % 12));
      }
      //mudolo to remove compound intervals
      interval = interval % 12;
      //add interval to set of intervals
      intervals.add(interval);
    }

    //loop through every chord in the chord db
    for (j = 0; j < chords.length; j++) {
      //if match found return chord
      if (chordEq(chords[j].intervals, intervals)) {
        //add root note and notation to chord display
        var chord = keys[root].dataset.note + chords[j].notation;
        //if bass note is different from the root add it
        if (bass != keys[root].dataset.note) {
          chord += "\\" + bass;
        }

        return chord
      }
    }
  }
  
  //nothing found; return blank
  return "";
}

//function to check equality between chords
function chordEq(set1, set2) {
  //if sizes of the size of notes don't match return false
  if (set1.size != set2.size) {
    return false;
  }
  //if sets contain different values return false
  for (let value of set1) {
    if(!set2.has(value)) {
      return false;
    }
  }
  //all checks passed; return true
  return true;
}

//stops playing all keys and increments the octave for all keys one up
function octaveUp() {
  //remove all playing notes
  for (var i = 0, len = keysPressed.length; i < len; i++) {
    stopNote(keysPressed[0]);
  }

  //get all keys in the html
  var keys = document.querySelectorAll(".key")
  //increment their octave up
  keys.forEach(key => key.dataset.octave = String(parseInt(key.dataset.octave) + 1))
}

//stops playing all keys and increments the octave for all keys one down
function octaveDown() {
  //remove all playing notes
  for (var i = 0, len = keysPressed.length; i < len; i++) {
    stopNote(keysPressed[0]);
  }

  //get all keys in the html
  var keys = document.querySelectorAll(".key");
  //increment their octave up
  keys.forEach(key => key.dataset.octave = String(parseInt(key.dataset.octave) - 1));
}



//--- mouse handler ---
//global var to hold state of mouse
var mouseDown = false;
//on mouse down set mousedown to true and trigger the mouse event handler play
document.addEventListener("mousedown", e => {
  mouseDown = true;
  mouseHandlerPlay(e.target);
});
//on mouse up set mousedown to false and trigger the mouse event handler stop
document.addEventListener("mouseup", e => {
  mouseDown = false;
  mouseHandlerStop(e.target);
});
//on mouse over trigger the mouse event handler play
document.addEventListener("mouseover", e => mouseHandlerPlay(e.target));
//on mouse out tigger the mouse event handler stop
document.addEventListener("mouseout", e => mouseHandlerStop(e.target));

//wrapper for playNote to check for mouseDown and null condition
function mouseHandlerPlay(mouseEvent) {
  if(mouseDown && mouseEvent.getAttribute('data-keycode') != null) {
    //trigger note
    poly.triggerAttack(mouseEvent.dataset.note + mouseEvent.dataset.octave);
    //set the key to playing
    mouseEvent.classList.add("playing");
    //update chord
    document.querySelector(".currentNote").innerHTML = getChord();
  }
}

//wrapper for stopNote to check for null condition
function mouseHandlerStop(mouseEvent) {
  if(mouseEvent.getAttribute('data-keycode') != null) {
    //release note
    poly.triggerRelease(mouseEvent.dataset.note + mouseEvent.dataset.octave);
    //remove playing from key
    mouseEvent.classList.remove("playing");
    //update chord
    document.querySelector(".currentNote").innerHTML = getChord();
  }
}



//--- Midi ---
var context = new AudioContext();
context.resume();

var midiAccess = null;

function _connect() {
    if(window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) {
        window.navigator.requestMIDIAccess().then(onMidiInit, onMidiReject);
		console.log("connected to midi");
    } else {
        console.log('No Web MIDI support'); //moved away from throwing exception
    }
}

function onMidiInit(midi){
	midiAccess = midi;
	//input = midiAccess.inputs[0];
	
	for (var input of midiAccess.inputs.values()) {
		    input.onmidimessage = getMIDIMessage; // assigned listening function
	}
	
	//input.addListener('noteon', "all",
    //function (e) {
      //console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
    //});
}

function getMIDIMessage(message) {
	//console.log(message);
		  var command = message.data[0];
		  var key = midiToKey(message.data[1]);
		  var velocity = (message.data.length > 2) ? message.data[2] : 0;
		  if (velocity == 0) {
		    command = 128;
		  }
		  if(command == 144){
			playNote(key);
		  }
		  else if(command == 128){
			  stopNote(key);
		  }
		}
		
		function midiToKey(midinum) {
		  var note = ["C", "CS", "D", "DS", "E", "F", "FS", "G", "GS", "A", "AS", "B", "C0", "CS0", "D0", "DS0", "E0", "F0", "FS0", "G0", "GS0", "A0", "AS0", "B0", "C1", "CS1", "D1", "DS1", "E1", "F1", "FS1", "G1", "GS1", "A1", "AS1", "B1", "C2", "CS2", "D2", "DS2", "E2", "F2", "FS2", "G2", "GS2", "A2", "AS2", "B2", "C3", "CS3", "D3", "DS3", "E3", "F3", "FS3", "G3", "GS3", "A3", "AS3", "B3", "C4", "CS4", "D4", "DS4", "E4", "F4", "FS4", "G4", "GS4", "A4", "AS4", "B4", "C5", "CS5", "D5", "DS5", "E5", "F5", "FS5", "G5", "GS5", "A5", "AS5", "B5", "C6", "CS6", "D6", "DS6", "E6", "F6", "FS6", "G6", "GS6", "A6", "AS6", "B6", "C7", "CS7", "D7", "DS7", "E7", "F7", "FS7", "G7", "GS7", "A7", "AS7", "B7", "C8"];
		  return note[midinum];
		}

function onMidiReject(){
	console.log("no midi");
}

_connect();