
## Sprint #1 Review

### Features Implemented

 - Working polyphonic synth with keyboard input.
 - Visual feedback for notes being played / basic site layout
 - Chord recognition for basic 3 and 4 note chords in root position.


### Issues fixed

 - N/A - We only made the initial commit in this sprint.

### Successes

 - Getting the polyphonic synth working went very well, and was much easier than expected. The tone.js framework made it very easy to implement.
 - Using the intervals of the notes being played made it very easy to implement chord recognition for chords in root position.

###  Problems/Solutions

 - Recognizing slash chords has proven to be much more difficult than we expected due to the contextual nature of chords. We have two options here: only recognize chords in root position, or come up with a way to recognize slash chords. In the case that we choose to recognize slash chords we will need to address the issue of these chords having different names in different contexts. We are still brainstorming ways in which we could implement slash chord recognition.
 - Apart from slash chords there are a lot of chords. Two solutions would be to implement only the most common ones, or to find some sort of database to go off. We have found a [database](http://vladimir_ladma.sweb.cz/english/music/structs/mus_rot.htm) to go off of and will be pursuing that route.

### Changes made

 - So far no changes have been made from our original concept
 - One potential change that may happen is the omission of slash chord recognition as discussed in the problems/solutions section, but we want to avoid this.

### Next Sprint

 - Expand chord recognition to recognize more chords and potentially slash chords.
 - Right now the synth plays a passable but not great simple triangle oscillator. Setting it up to play piano sounds via the sampler function in tone.js is one of our top priorities of our next sprint as the sound of our application is obviously very important.
 - Octave switching is set up structurally, but not implemented. This will be easy to implement in the next sprint.
 - Begin implementing the selection of a chord name to displaying its notes functionality.

### Scrum Review