//create synth
const poly = new Tone.PolySynth(4, Tone.Synth, {
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

//keeps track of which keys are currently pressed
const keysPressed = [];

//add listener for key presses to trigger notes
document.addEventListener("keydown", e => playNote(e.keyCode.toString()));
//add listener for key releases to release notes
document.addEventListener("keyup", e => stopNote(e.keyCode.toString()));

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
      getChord();
    }
  }
}

//releases the note to corresponding the keycode of e
function stopNote(keycode) {
  //only trigger on valid keys
  if (pianoKeycodes.includes(keycode)) {
    //remove key from pressed
    keysPressed.splice(keysPressed.indexOf(keycode), 1)
    //get respective key from keycode
    var key = document.querySelector(".key[data-keycode=\"" + keycode + "\"]");
    //remove playing transform from respective key
    key.classList.remove("playing");
    //release note
    poly.triggerRelease(key.dataset.note + key.dataset.octave);
    //display note/chord being played
    getChord();
  }
}

function getChord() {
  //get all playing keys
  var keys = document.querySelectorAll(".key.playing");
  //get indicies of playing notes
  var indicies = [];
  for (i = 0; i < keys.length; i++) {
    indicies.push(keys[i].dataset.pos);
  }
  //get intervals between indicies
  var intervals = [];
  for (i = 0; i < (indicies.length - 1); i++) {
    intervals.push(indicies[i+1] - indicies[i]);
  }

  //switch based on number of notes being played
  switch (keys.length) {
    //3 notes
    case 3:
      checkChord3(keys, intervals);
      break;

    //4 notes
    case 4:
      checkChord4(keys, intervals);
      break;

    default:
      document.querySelector(".currentNote").innerHTML = "";
      break;
  }
}

//checks which three note chord is being played
function checkChord3(keys, intervals) {
  //major
  if (intervals[0] == 4 && intervals[1] == 3) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "maj";
  }

  //minor
  else if (intervals[0] == 3 && intervals[1] == 4) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "min";
  }

  //augmented
  else if (intervals[0] == 4 && intervals[1] == 4) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "aug";
  }

  //diminished
  else if (intervals[0] == 3 && intervals[1] == 3) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "dim";
  }

  //no match
  else {
    document.querySelector(".currentNote").innerHTML = "";
  }
}

//checks which 4 note chord is being played
function checkChord4(keys, intervals) {
  //dominant 7th
  if (intervals[0] == 4 && intervals[1] == 3 && intervals[2] == 3) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "7";
  }

  //major 7th
  else if (intervals[0] == 4 && intervals[1] == 3 && intervals[2] == 4) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "maj7";
  }

  //minor 7th
  else if (intervals[0] == 3 && intervals[1] == 4 && intervals[2] == 3) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "min7";
  }

  //half diminished 7th
  else if (intervals[0] == 3 && intervals[1] == 3 && intervals[2] == 4) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "half-dim7";
  }

  //diminished 7th
  else if (intervals[0] == 3 && intervals[1] == 3 && intervals[2] == 3) {
    var root = keys[0].dataset.note;
    document.querySelector(".currentNote").innerHTML = root + "dim7";
  }

  //no match
  else {
    document.querySelector(".currentNote").innerHTML = "";
  }
}