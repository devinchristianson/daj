## Sprint #4 Review

### Features Implemented

- Testing framework built.

### Issues fixed

- None.

### Successes

 - Testing framework works, now we just need to use it.

###  Problems/Solutions

 - User accounts add a lot of complexity. In order to avoid some of that complexity, we are using Google Sign-on to handle Authentication, meaning PolyChord needs to interface with Google Sign-on, and handle sessions.

### Changes made

 - A Unit + Integration testing framework has been put in place, using Mocha, Karma, and Chai. This wasn't required for any specific use cases, but was necessary to find bugs and keep the code quality good.
 - Progress was made on the backend for the user accounts and Google Sign-on functionality. The database and the database logic, and session handling still need to be implemented.

### Next Sprint

 - Continue work on the backend for Google Sign-on
 - Write more tests.
 - Bug fixes.

### Scrum Review

 - Some member contributed little to the project, for unclear reasons.
 - What needs improvement:
    - Organization: at times, the members do not communicate what they are working on, leading to merge conflicts, and an unclear record of contribution at the end.
    - Contribution to the code base: All contributions should be functional, or at least not lead to a regression in functionality - this means developers should test their code before merging into master. Also, while some development did take place this sprint, there was little successful work on new features, despite plans to do so.