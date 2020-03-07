//create synth
const poly = new Tone.PolySynth(10, Tone.Synth, {
  oscillator: {
    type: "triangle"
  }
}).toMaster();

//get all keys
var temp = document.querySelectorAll(".key");
//create array of valid key inputs

var keyboardLookup = {"87": "C#4", "83": "D4"};
keyboardLookup["69"] = "D#4";
var pianoKeycodes = [];
for (i = 0; i < temp.length; i++) {
	//Object.assign(pianoKeycodes, {temp[i].dataset.keycode.toString(): temp[i].dataset.note.toString()})
	pianoKeycodes[temp[i].dataset.keycode.toString()] = temp[i].dataset.note.toString();
	//pianoKeys.assign(
  //pianoKeycodes.push(keyboardLookup[temp[i].dataset.keycode]);
}


var midiAccess = null;

//-- keyboard controller logic --
//keeps track of which keys are currently pressed
const keysPressed = [];

//-- parse chords csv --
//create array to hold chord information
const chords = [];
//begin parse of the chord file
Papa.parse("chords.csv", {
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

//add listener for key presses to trigger notes
document.addEventListener("keydown", e => playNote(pianoKeycodes[e.keyCode.toString()]));
//add listener for key releases to release notes
document.addEventListener("keyup", e => stopNote(pianoKeycodes[e.keyCode.toString()]));

//plays the note corresponding  to the keycode of e
function playNote(keycode) {
	console.log(keycode);
  //only trigger on valid keys
  //keycode = 65;
  if (pianoKeycodes.includes(keycode)) {
    //dont trigger if key is already pressed
    if (!keysPressed.includes(keycode)) {
      //push keycode to pressed
      keysPressed.push(keycode);
      //get respective key from keycode
      //var key = document.querySelector(".key[data-keycode=\"" + keycode + "\"]");
	  var key = document.querySelector(".key[data-note=\"" + keycode + "\"]");
	  console.log(key);
      //add playing transform to respective note
      key.classList.add("playing");
      //play note
      poly.triggerAttack(key.dataset.note);
      //display note/chord being played
      document.querySelector(".currentNote").innerHTML = getChord();
    }
  }
}

//releases the note to corresponding the keycode of e
function stopNote(keycode) {
  //only trigger on valid keys
  if (pianoKeycodes.includes(keycode)) {
    //remove key from pressed
    keysPressed.splice(keysPressed.indexOf(keycode), 1);
    //get respective key from keycode
    //var key = document.querySelector(".key[data-keycode=\"" + keycode + "\"]");
	var key = document.querySelector(".key[data-note=\"" + keycode + "\"]");
    //remove playing transform from respective key
    key.classList.remove("playing");
    //release note
    poly.triggerRelease(key.dataset.note);
    //display note/chord being played
    document.querySelector(".currentNote").innerHTML = getChord();
  }
}

//gets the currently playing chord; returns blank on no match
function getChord() {
  //get all playing keys
  var keys = document.querySelectorAll(".key.playing");
  console.log(keys);

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

function _connect() {
    if(window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) {
        window.navigator.requestMIDIAccess().then(onMidiInit, onMidiReject);
		console.log("connected to midi");
    } else {
        throw 'No Web MIDI support';
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