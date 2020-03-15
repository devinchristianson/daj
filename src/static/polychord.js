//create synth
const poly = new Tone.PolySynth(10, Tone.Synth, {
  oscillator: {
    type: "triangle"
  }
}).toMaster();

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
document.addEventListener("keydown", e => playNote(e.keyCode.toString()));
//add listener for key releases to release notes
document.addEventListener("keyup", e => stopNote(e.keyCode.toString()));
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
  if(mouseDown && mouseEvent.target.getAttribute('data-keycode') != null) {
    playNote(mouseEvent.target.getAttribute('data-keycode').toString());
  }
}
//wrapper for stopNote to check for null condition
function mouseHandlerStop(mouseEvent) {
  if(mouseEvent.target.getAttribute('data-keycode') != null) {
    stopNote(mouseEvent.target.getAttribute('data-keycode').toString());
  }
}
//touch support
document.addEventListener("touchstart", e => startNote(e.target.getAttribute('data-keycode').toString()));
document.addEventListener("touchend", e => stopNote(e.target.getAttribute('data-keycode').toString()));
//plays the note corresponding  to the keycode of e
function playNote(keycode) {
  //only trigger on valid keys
  if (pianoKeycodes.includes(keycode)) {
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
    }
  }
	else if (keycode == 187){
    //incement octave using "=" if in a reasonable range
		if(parseInt(document.querySelector(".key[data-keycode=\"" + pianoKeycodes[0] + "\"]").dataset.octave) < 8){
			for (i = 0; i < pianoKeycodes.length; i++){
				//get data for respective note
				temp = document.querySelector(".key[data-keycode=\"" + pianoKeycodes[i] + "\"]");
				//console.log(temp.dataset.octave[0])
				//increment octave if in a reasonable range
				temp.dataset.octave = String(parseInt(temp.dataset.octave) + 1);
			}
    }
  }
  else if (keycode == 189){
		//decrement octave using "-" if in a reasonable range
		if (parseInt(document.querySelector(".key[data-keycode=\"" + pianoKeycodes[0] + "\"]").dataset.octave) > 0){
			for (i = 0; i < pianoKeycodes.length; i++){
				//get data for respective note
				temp = document.querySelector(".key[data-keycode=\"" + pianoKeycodes[i] + "\"]");
				//decrement octave if in a reasonable range
				temp.dataset.octave = String(parseInt(temp.dataset.octave) - 1);
			}
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
    var key = document.querySelector(".key[data-keycode=\"" + keycode + "\"]");
    //remove playing transform from respective key
    key.classList.remove("playing");
    //release note
    poly.triggerRelease(key.dataset.note + key.dataset.octave);
		//fix for octave switching, removing will make note persist if held when switching octave
    poly.triggerRelease(key.dataset.note + String(parseInt(key.dataset.octave) + 1));
    poly.triggerRelease(key.dataset.note + String(parseInt(key.dataset.octave) - 1));
		//display note/chord being played
    document.querySelector(".currentNote").innerHTML = getChord();
  }
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
