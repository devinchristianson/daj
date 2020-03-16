

## Sprint #2 Review

### Features Implemented

 - Mouse hiding only when over keyboard
 - Slash Chords now recognized

### Issues fixed

 - Figured out a method for slash chord recognition

### Successes

 - Slash chord recognition
 
###  Problems/Solutions

 - computers without n-key rollover may have issues using Polychord as some note combinations are not possible without it. There is currently not a solution to this and as it is a hardware limitation, it may unfortunately be impossible to solve without different hardware.
 - Mousing over a key currently being played stops that key from being played, and if it was not the most recently played does so until that key is pressed again.

### Changes made

 - We have decided to opt for a self-maintained database rather than the database mentioned in the sprint 1 review. This should make managing the logic significantly easier and save some potential issues with ambiguity of chords, particulary slash chords.

### Next Sprint

 - Setting up non-triangle wave waveforms is once again one of the main priorities for the next sprint.
 - Octave switching is set up structurally, but not implemented. This will be easy to implement in the next sprint.
 - MIDI keyboard support
 - Implementation of a basic menu to swap waveforms/octaves

### Scrum Review

 - Some group members didn't contribute much to the project during this sprint due to various reasons.
 - What needs improvement: Contribution to the codebase: not everyone on the development team made a contribution in this sprint, partially because of other class workloads and partially because of unfamiliarity with website development. Getting everyone to have a general understanding of website programming and the current code would likely help out a lot.
