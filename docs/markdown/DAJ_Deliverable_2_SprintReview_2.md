

## Sprint #2 Review

### Features Implemented

 - Mouse can trigger keyboard keys
 - Slash Chords now recognized

### Issues fixed

 - Figured out a method for slash chord recognition

### Successes

 - Slash chord recognition

###  Problems/Solutions

 - computers without n-key rollover may have issues using Polychord as some note combinations are not possible without it. There is currently not a solution to this and as it is a hardware limitation, it may unfortunately be impossible to solve without different hardware.
 - Using the mouse input **and** the keybord input at the same time results in unexpected results: mousing over a key that is played from the keyboard causes the key to stop playing. This is an edge case, as we expect the mouse to only be used for first-time experimentation, so it is being tracked, but has a low priority

### Changes made

 - We have decided to opt for a self-maintained database rather than the database mentioned in the sprint 1 review. This should make managing the logic significantly easier and save some potential issues with ambiguity of chords, particulary slash chords.

### Next Sprint

 - Octave switching is set up structurally, but not implemented. This will be easy to implement in the next sprint.
 - MIDI keyboard support
 - Implementation of a Flask-based back end, as many more complex features rely on it.
 - Setting up non-triangle wave waveforms is once again one of the main priorities for the next sprint.

### Scrum Review

 - Some group members didn't contribute much to the project during this sprint for various reasons.
 - What needs improvement: 
    - Contribution to the codebase: not everyone on the development team made a contribution in this sprint, partially because of other class workloads and partially because of unfamiliarity with website development. Getting everyone to have a general understanding of website programming and the current code would likely help out a lot.
