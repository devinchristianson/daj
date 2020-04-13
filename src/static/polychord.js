//create synth
const poly = new Tone.PolySynth(10, Tone.Synth, {
  oscillator: {
    type: "triangle"
  }
}).toMaster();


var octave = 0;			//keep track of any octave shifts that have occurred.
var sus = false;		//keep track of if sustain (shift) is being held.

var pianoKeycodes = {};
//get all keys
var temp = document.querySelectorAll(".key");
//create array of valid key inputs
for (i = 0; i < temp.length; i++) {
	pianoKeycodes[temp[i].dataset.keycode.toString()] = temp[i].dataset.note.toString();
	//console.log(pianoKeycodes[temp[i].dataset.keycode.toString()])
}

var hotkeys = ["Minus", "Equal", "Shift"]

var context = new AudioContext();
context.resume();

var midiAccess = null;

//-- keyboard controller logic --
//keeps track of which keys are currently pressed
const keysPressed = [];

//-- parse chords csv --
//create array to hold chord information
const chords = [];
//begin parse of the chord file
Papa.parse( csvPath, {
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
window.addEventListener("keydown", function(event) {
	var temp = document.querySelectorAll(".key");
	temp.forEach(function (item, index){
		//if there is a note to the key
		if (event.code == item.dataset.keycode){
			//play the key
			playNote(item.dataset.note);
		}
		if (event.code == "ShiftLeft"){
			sus = true;
		}
	});
	str = event.code;
});

//add listener for key releases to release notes
window.addEventListener("keyup", function(event) {
	var temp = document.querySelectorAll(".key");
	temp.forEach(function (item, index){
		//if there is a note to the key
		if (event.code == item.dataset.keycode){
			//play the key
			stopNote(item.dataset.note);
		}
		else if (event.code == "ShiftLeft"){
			sus = false;
			for (var i = 0; i < keysPressed.length; i++){
				poly.triggerRelease(keysPressed[i]);
			}
			stopAll();
		}
		else if (event.code == "Minus"){
			octaveDown();
		}
		else if (event.code == "Equal"){
			octaveUp();
		}
	});
	str = event.code;
});

//global var to hold state of mouse
var mouseDown = false;
//add listener for mouseup that sets mousedown=up and stops play
document.addEventListener("mouseup", function(e) {
  mouseDown = false;
  mouseHandlerStop(e);
});
//add listener for mousedown that sets mousedown=true and starts play
document.addEventListener("mousedown", function(e) {
  mouseDown = true;
  mouseHandlerPlay(e);
});
//add listener for mouseover and mouseout
document.addEventListener("mouseover", e => mouseHandlerPlay(e));
document.addEventListener("mouseout", e => mouseHandlerStop(e));


//wrapper for playNote to check for mouseDown and null condition
function mouseHandlerPlay(mouseEvent) {
  if(mouseDown && mouseEvent.target.getAttribute('data-note') != null) {
    playNote(mouseEvent.target.getAttribute('data-note').toString());
  }
	else if (mouseDown){
		if (mouseEvent.target.textContent == "Octave Up"){
			octaveUp()
		}
		else if (mouseEvent.target.textContent == "Octave Down"){
			octaveDown()
		}
	}
}
//wrapper for stopNote to check for null condition
function mouseHandlerStop(mouseEvent) {
  if(mouseEvent.target.getAttribute('data-note') != null) {
    stopNote(mouseEvent.target.getAttribute('data-note').toString());
  }
}
//touch support
document.addEventListener("touchstart", e => startNote(e.target.getAttribute('data-note').toString()));
document.addEventListener("touchend", e => stopNote(e.target.getAttribute('data-note').toString()));
//document.addEventListener("touchstart", e => startNote(pianoKeycodes[e.target.getAttribute('data-note').toString()]));
//document.addEventListener("touchend", e => stopNote(pianoKeycodes[e.target.getAttribute('data-note').toString()]));

//plays the note corresponding  to the keycode of e
function playNote(keycode) {
  //only trigger on valid keys
	
	var noteName = keycode.substring(0, keycode.length - 1);
	noteName += parseInt(keycode.substring(keycode.length - 1, keycode.length)) + octave;
	
	//dont trigger if key is already pressed
	if (!keysPressed.includes(noteName)) {
		//push keycode to pressed
		keysPressed.push(noteName);
		//get respective key from keycode
		var key = document.querySelector(".key[data-note=\"" + keycode + "\"]");
		//add playing transform to respective note
		key.classList.add("playing");
		//play note
		poly.triggerAttack(noteName);
		//display note/chord being played
		document.querySelector(".currentNote").innerHTML = getChord();
	}
  return noteName;
}

//releases the note to corresponding the keycode of e
function stopNote(keycode) {
	if (!sus){
		keycode = keycode.toString()

		var noteName = keycode.substring(0, keycode.length - 1);
		noteName += parseInt(keycode.substring(keycode.length - 1, keycode.length)) + octave;
		//remove key from pressed
		keysPressed.splice(keysPressed.indexOf(noteName), 1);
		//get respective key from keycode
		var key = document.querySelector(".key[data-note=\"" + keycode + "\"]");
		//remove playing transform from respective key
		key.classList.remove("playing");
		//release note
		poly.triggerRelease(noteName);
		//display note/chord being played
		document.querySelector(".currentNote").innerHTML = getChord();
		return noteName;
	}
}

function octaveUp(){
	//decrement octave using "-" if in a reasonable range (0-8)
	if (octave < 5){
		var temp = document.querySelectorAll(".key");
		if (!sus){
			stopAll();
		}

		octave = octave + 1;
	}
}

function octaveDown(){
	if (octave > -5){
		var temp = document.querySelectorAll(".key");
		if (!sus){
			stopAll()
		}
		octave = octave - 1;
	}
}

function stopAll(){
	//lower and upper should be -5 and 5 by default
	console.log(keysPressed);
	for (var i = 0; i < keysPressed.length; i++){
		stopNote(keysPressed[i]);
	}
}
//gets the currently playing chord; returns blank on no match
function getChord() {
  //get all playing keys
  var keys = document.querySelectorAll(".key.playing");
  //console.log(".key.playing")
  /*
	for(var value of keys.values()) { 
    console.log(value); 
  }
	*/
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

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://polychord.mdics.me/idtoken');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send('idtoken=' + id_token);
}

_connect();

