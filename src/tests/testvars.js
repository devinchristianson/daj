//correct vars overriding index.html 
var csvPath = "/base/static/chords.csv";
var metronomeSoundPath = null;
//setting up very basic DOM
var pianoKey1 = document.createElement("div");
pianoKey1.setAttribute("data-keycode", "KeyA");
pianoKey1.setAttribute("data-note", "C");
pianoKey1.setAttribute("data-octave", "4");
pianoKey1.setAttribute("class", "key");
var pianoKey2 = document.createElement("div");
pianoKey2.setAttribute("data-keycode", "KeyK");
pianoKey2.setAttribute("data-note", "C");
pianoKey2.setAttribute("data-octave", "5");
pianoKey2.setAttribute("class", "key");
var currentNote = document.createElement("div");
currentNote.setAttribute("class", "currentNote");
var body = document.getElementsByTagName("body")[0];
body.appendChild(pianoKey1);
body.appendChild(pianoKey2);
body.appendChild(currentNote);