

## Sprint #6 Review

### Features Implemented

 - Basic Metronome Functionality


### Issues fixed

 - Testing was broken during last re-factor and has been fixed.
 - Corrected Docker Image tagging
 - Small bug fixes/oversights

### Successes

 - Metronome addition went smoothly.
 - Docker image tagging is finally working correctly

###  Problems/Solutions

 - The majority of the client-side JavaScript functions are stateless and rely on the state within the DOM making them difficult to test without the HTML state. The solution was to include pieces of the DOM in the unit tests, and this sprint we got it down - testing has been expanded to include functions that manipulate the DOM.


### Changes made

 - Improved Testing, now testing on both Firefox and Chrome.
 - Metronome added.
 - Docker Image tagging improved so that the latest image is always tagged with the version number **and** with the "latest" tag

### Next Sprint

 - We need to finish adding the features we didn't get around to doing this sprint. The biggest two being touch support, and Google sign on functionality.
 - Touch support has been researched and we have an idea of how to implemented, but has yet to be started.
 - Google sign on functionality is partially complete, but still needs to be fully implemented.

### Scrum Review

 - Less frequent Scrum meetings this time around as we were mostly focused on presenting Polychord's progress so far, as well as independent bug fixes and testing.
 - Scrum meetings were kept brief and at this point the team is really good at divvying up work quickly and getting it all done in an organized fashion.