

# Use Case Models and Use Case Descriptions

## Use Case Models

### Piano Keyboard Input

#### Use Case model:

![Piano Keyboard User Case Model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/pianokeyboardUserCase.png)

#### Use Case Descriptions:

Play Keyboard:

- Use Case ID: 1
- Relevant User Story IDs: 1,2
- Actors:  User
- Related Use Cases: 
  - Extended by 2. View Note
  - Extended by 3. View Chord
  - Extended by 4. View Chord Progression
- Preconditions: None
- Post-conditions: None
- Exceptions handled: None

**Steps:**

| ***User Actions***              | ***System Responses***                                |
| ------------------------------- | ----------------------------------------------------- |
| - User selects notes on the piano | - System plays the corresponding sounds for the notes |

**View Note**:

- Use Case ID: 2
- Relevant User Story IDs: 31
- Actors: User
- Related Use Cases: Play Keyboard
- Preconditions: User Plays Piano
- Success Post-conditions: System displays each note as it is played
- Exceptions handled: None

**Steps:**

| ### User Actions                                             | ### System Responses                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - User plays notes on the Piano<br /><br />- User views notes as they play | <br />- System plays the corresponding sounds for the notes<br />- System displays each note as it is played<br /> |

**View Chord**:

- Use Case ID: 3
- Relevant User Story IDs: 1, 4
- Actors: User
- Related Use Cases: Play Keyboard
- Preconditions: User Plays Piano, notes played form a valid chord
- Success Post-conditions: Chord being played is displayed
- Exceptions handled: If the notes aren't a chord, nothing is displayed 

**Steps:**

| ### User Actions                                             | ### System Responses                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. User plays notes on the Piano<br /><br />4. User views chords as they play | <br />2. System plays the corresponding sounds for the notes<br />3. System displays the chord name<br /> |

**View Chord Progression**:

- Use Case ID: 4
- Relevant User Story IDs: 28, 30
- Actors: User
- Related Use Cases: Play Keyboard
- Preconditions: User Plays Piano, notes played form valid chord
- Success Post-conditions: System displays chord progression as it is played
- Exceptions handled: If the notes aren't a chord, nothing is displayed

**Steps:**

| ### User Actions                                             | ### System Responses                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. User plays notes on the Piano<br />3. User views notes as they play<br /> | <br />2. System plays the corresponding sounds for the notes<br />4. System displays chord progression suggestion |

**Change Synth Sound**:

- Use Case ID: 5
- Relevant User Story IDs: 9, 22
- Actors: User
- Related Use Cases: None
- Preconditions: None
- Success Post-conditions: System uses selected synth sound
- Exceptions handled: None

**Steps:**

| ### User Actions                     | ### System Responses                                       |
| ------------------------------------ | ---------------------------------------------------------- |
| - User selects change Synth sound<br /><br /> - User changes synth sound | <br />- System shows synth sound menu<br /> - System changes sound profile that is played by piano |

**Change octave**:

- Use Case ID: 6
- Relevant User Story IDs: 17
- Actors: User
- Related Use Cases: None
- Preconditions: None
- Success Post-conditions: System outputs synthesized audio in selected octave
- Exceptions handled: None

**Steps:**

| ### User Actions      | ### System Responses                                |
| --------------------- | --------------------------------------------------- |
| - User selects change octave<br /><br /> - User sees updated octave | - System changes the octave that is played by piano<br /> - System updates octave |

**Change input method**:

- Use Case ID: 7
- Relevant User Story IDs: 7, 31
- Actors: User
- Related Use Cases:
- Extended by 9. Setup Midi Device
- Preconditions: In order for the Midi input to be selected, a Midi device must be set up
- Success Post-conditions: System uses selected input method
- Exceptions handled: If no Midi device is set up, the system must prompt the user to set one up, or leave the input on 'keyboard'

**Steps:**

| ### User Actions                                             | ### System Responses                                      |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| - User changes from Keyboard to MIDI or MIDI to keyboard input | - System accepts piano input only from the selected input |

**Choose Chord Progression Feel**:

- Use Case ID: 8
- Relevant User Story IDs: 16
- Actors: User
- Related Use Cases: None
- Preconditions: None
- Success Post-conditions: System uses desired feel when selecting chords
- Exceptions handled: None

**Steps:**

| ### User Actions                              | ### System Responses                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| - User chooses desired chord progression feel | - System prioritizes the user's desired feel when suggesting chord progressions |

***Setup Midi device***:

- Use Case ID: 9
- Relevant User Story IDs: 7, 31
- Actors: User
- Related Use Cases: None
- Preconditions: 
- Success Post-conditions: Input can be changed to Midi
- Exceptions handled: If no Midi device can be detected for setup, the system must present an error to the user

**Steps:**

| ### User Actions           | ### System Responses                                         |
| -------------------------- | ------------------------------------------------------------ |
| - User plugs in MIDI device <br /><br />- User sets up Midi device | <br />- System attempts to detect Midi device<br /><br />- System sets up detected Midi device |



-------------------------------------------------------------------------------------------------------------------------------
### Playback Interface

#### Use Case model:

![Playback Interface User Case Model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/playbackinterfaceUserCase.png)

#### Use Case Descriptions:

***Select Chord***:

- Use Case ID: 10
- Relevant User Story IDs: 8
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System plays back selected Chord
- Exceptions handled: None

**Steps:**

| ### User Actions | ### System Responses                    |
| ---------------- | --------------------------------------- |
| - Select chord   | - Switch playback to the selected chord |

***Select Chord Progression***:

- Use Case ID: 11
- Relevant User Story IDs: 8
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System plays back selected Chord Progression
- Exceptions handled: None

**Steps:**

| ### User Actions           | ### System Responses                                |
| -------------------------- | --------------------------------------------------- |
| - Select chord progression | - Switch playback to the selected chord progression |

***Change playback speed***:

- Use Case ID: 12
- Relevant User Story IDs: 8
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System uses updated playback speed.
- Exceptions handled: None

**Steps:**

| ### User Actions                      | ### System Responses                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| - Increase or decrease playback speed | - If playing: Modulate playback speed based on input<br />- If paused, update speed to be used when playback starts |

***Change Playback View***:

- Use Case ID: 13
- Relevant User Story IDs: 8
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System uses selected output view
- Exceptions handled: None

**Steps:**

| ### User Actions                               | ### System Responses                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| - Select Fretboard, Ledger, or Piano Roll view | - System changes current playback view to the one that the use selected |

***Toggle Playback***:

- Use Case ID: 14
- Relevant User Story IDs: 8
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System will playback selected Chords/Chord Progression
- Exceptions handled: The user has not selected a chord or chord progression, the system will play a default C major chord.

**Steps:**

| ### User Actions               | ### System Responses                                         |
| ------------------------------ | ------------------------------------------------------------ |
| - Toggle the play/pause button | - If the system was already playing, stop<br />- If the system was not playing, start playback |

-------------------------------------------------------------------------------------------------------------------------------
### Playback Peripherals

#### Use Case model:

![Playback Peripherals User Case Model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/playbackperipheralUserCase.png)

#### Use Case Descriptions:

***Learn Theory***:

- Use Case ID: 15
- Relevant User Story IDs: 37
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System displays theory lessons
- Exceptions handled: None

**Steps:**

| ### User Actions | ### System Responses                    |
| ---------------- | --------------------------------------- |
| 1. Select Learn Theory   | 2. Display theory lessons |

***Practice Theory***:

- Use Case ID: 16
- Relevant User Story IDs: 24
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System displays theory excercises
- Exceptions handled: None

**Steps:**

| ### User Actions           | ### System Responses                                |
| -------------------------- | --------------------------------------------------- |
| 1. Select Practice Theory | 2. Display theory excercises |

***Download Progression***:

- Use Case ID: 17
- Relevant User Story IDs: 6,21,39
- Actors: User
- Related Use Cases: None
- Preconditions: Selected progression is not empty
- Success Post-conditions: User downloads file containing a progression.
- Exceptions handled: None

**Steps:**

| ### User Actions                      | ### System Responses                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| 1. Select download progression<br /> 4. Save file | 2. Create corresponding file<br /> 3. Send file to User |

***Upload Progression***:

- Use Case ID: 18
- Relevant User Story IDs: 6,21
- Actors: User
- Related Use Cases: None
- Preconditions: None.
- Success Post-conditions: System displays uploaded chord progression
- Exceptions handled: None

**Steps:**

| ### User Actions                               | ### System Responses                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| 1. User selects upload progression<br /> 2. User uploads file<br /><br /><br /> 4. Play progression | <br /><br /> 3a. Recieve file<br /> 3b. Verify file<br /> 3c. Display progression |

-------------------------------------------------------------------------------------------------------------------------------

### User Account management

#### Use Case model:

![Account Management Interface User Case Model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/accountmanagementinterfaceUserCase.png)

#### Use Case Descriptions:

***Sign in with Google***:

- Use Case ID: 19
- Relevant User Story IDs: 21, 37, 39
- Actors: User
- Related Use Cases: None
- Preconditions: User has Google account
- Success Post-conditions: User is signed into PolyChord with their Google account
- Exceptions handled: None

**Steps:**

| ### User Actions                                             | ### System Responses                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. Click Sign in with Google<br /><br />3. Sign into Google account<br /><br /><br />6. User is signed in | <br />2. Redirect user to Google Sign-on<br /><br />4. Pass ID Token to backend to make cookie<br />5. Pass cookie to Client |

***Sign out***:

- Use Case ID: 20
- Relevant User Story IDs: 41
- Actors: User
- Related Use Cases: 
  - Extended by Delete Account
- Preconditions: User is signed in
- Success Post-conditions: User is signed out
- Exceptions handled: None

**Steps:**

| ### User Actions                                          | ### System Responses                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| 1. User selects Sign Out<br /><br />4. User is signed out | <br />2. Sign out user through Google<br />3. Unset cookie<br /> |

***Save Chord***:

- Use Case ID: 21
- Relevant User Story IDs: 6
- Actors: User
- Related Use Cases: None
- Preconditions: User is signed in, User has played chord
- Success Post-conditions: User's chord is saved to their account
- Exceptions handled: If User has not played a chord, they are given an error message

**Steps:**

| ### User Actions          | ### System Responses                         |
| ------------------------- | -------------------------------------------- |
| 1. User saves chord<br /> | <br />2. System saves chord to db under user |

Play Saved Chord:

- Use Case ID: 22
- Relevant User Story IDs: 8, 13
- Actors: User
- Related Use Cases: None
- Preconditions: User is signed in
- Success Post-conditions: User's saved chord is played
- Exceptions handled: None

**Steps:**

| ### User Actions                                | ### System Responses                                 |
| ----------------------------------------------- | ---------------------------------------------------- |
| 1. User selects saved chord to play<br /><br /> | <br />2. Chord is retrieved <br />3. Chord is played |

***Save Synth Profile***:

- Use Case ID: 23
- Relevant User Story IDs: 9
- Actors: User
- Related Use Cases: None
- Preconditions: User is signed in
- Success Post-conditions: User's Synth profile is saved to their account
- Exceptions handled: None

**Steps:**

| ### User Actions            | ### System Responses                                 |
| --------------------------- | ---------------------------------------------------- |
| 1. User saves synth profile | <br />2. System saves synth profile to db under user |

***Use Stored Synth Profile***:

- Use Case ID: 24
- Relevant User Story IDs: 9
- Actors: User
- Related Use Cases: None
- Preconditions: User is signed in
- Success Post-conditions: Synth uses save Profile
- Exceptions handled: None

**Steps:**

| ### User Actions                           | ### System Responses                              |
| ------------------------------------------ | ------------------------------------------------- |
| 1. User restores saved synth profile<br /> | <br />2. System retrieves and loads synth profile |

***Delete Account***:

- Use Case ID: 25
- Relevant User Story IDs: 41
- Actors: User
- Related Use Cases: Sign Out
- Preconditions: User is signed in
- Success Post-conditions:  User's data is removed, User is signed out
- Exceptions handled: None

**Steps:**

| ### User Actions                                 | ### System Responses                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| 1. User opts to delete their account<br /><br /> | <br />2. User's data is deleted from DB<br />3. User is signed out |
