

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

- Preconditions: None

- Post-conditions: None

- Exceptions handled: None

**Steps:**

| ***User Actions***              | ***System Responses***                                |
| ------------------------------- | ----------------------------------------------------- |
| - User plays notes on the piano | - System plays the corresponding sounds for the notes |

**View Note**:

- Use Case ID: 2

- Relevant User Story IDs: 31

- Actors: User

- Preconditions: User Plays Piano

- Post-conditions: None

- Exceptions handled: None

**Steps:**

| ### User Actions                                             | ### System Responses                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - User plays notes on the Piano<br />- User views notes as they play | - System plays the corresponding sounds for the notes<br />- System displays each note as it is played |

**View Chord**:

- Use Case ID: 3

- Relevant User Story IDs: 1, 4

- Actors: User

- Preconditions: User Plays Piano, notes played form a valid chord

- Post-conditions: None

- Exceptions handled: If the notes aren't a chord, nothing is displayed 

**Steps:**

| ### User Actions                                             | ### System Responses                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - User plays notes on the Piano<br />- User views chords as they play | - System plays the corresponding sounds for the notes<br />- System displays the chord name |

**View Chord Progression**:

- Use Case ID: 4

- Relevant User Story IDs: 28, 30

- Actors: User

- Preconditions: User Plays Piano, notes played form valid chord

- Post-conditions: None

- Exceptions handled: If the notes aren't a chord, nothing is displayed

**Steps:**

| ### User Actions                                             | ### System Responses                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - User plays notes on the Piano<br />- User views notes as they play | - System plays the corresponding sounds for the notes<br />- System displays chord progression suggestion |

**Change Synth Sound**:

- Use Case ID: 5

- Relevant User Story IDs: 9, 22

- Actors: User

- Preconditions: None

- Post-conditions: None

- Exceptions handled: None

**Steps:**

| ### User Actions                     | ### System Responses                                       |
| ------------------------------------ | ---------------------------------------------------------- |
| - User changes Synth sound selection | - System changes the sound profile that is played by piano |

**Change octave**:

- Use Case ID: 6

- Relevant User Story IDs: 17

- Actors: User

- Preconditions: None

- Post-conditions: None

- Exceptions handled: None

**Steps:**

| ### User Actions      | ### System Responses                                |
| --------------------- | --------------------------------------------------- |
| - User changes octave | - System changes the octave that is played by piano |

**Change input method**:

- Use Case ID: 7

- Relevant User Story IDs: 7, 31

- Actors: User

- Preconditions: In order for the Midi input to be selected, a Midi device must be set up

- Post-conditions: None

- Exceptions handled: If no Midi device is set up, the system must prompt the user to set one up, or leave the input on 'keyboard'

**Steps:**

| ### User Actions                                             | ### System Responses                                      |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| - User changes from Keyboard to MIDI or MIDI to keyboard input | - System accepts piano input only from the selected input |

**Choose Chord Progression Feel**:

- Use Case ID: 8

- Relevant User Story IDs: 16

- Actors: User

- Preconditions: None

- Post-conditions: None

- Exceptions handled: None

**Steps:**

| ### User Actions                              | ### System Responses                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| - User chooses desired chord progression feel | - System prioritizes the user's desired feel when suggesting chord progressions |

***Setup Midi device***:

- Use Case ID: 9

- Relevant User Story IDs: 7, 31

- Actors: User

- Preconditions: 

- Post-conditions: Input can be changed to Midi

- Exceptions handled: If no Midi device can be detected for setup, the system must present an error to the user

**Steps:**

| ### User Actions           | ### System Responses                                         |
| -------------------------- | ------------------------------------------------------------ |
| - User sets up Midi device | - System attempts to detect Midi device<br />- System sets up detected Midi device |



-------------------------------------------------------------------------------------------------------------------------------
### Playback Interface

#### Use Case model:

![Playback Interface User Case Model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/playbackinterfaceUserCase.png)

#### Use Case Descriptions:

***Select Chord***:

- Use Case ID: 10

- Relevant User Story IDs: 8

- Actors: User

- Preconditions: None.

- Post-conditions: None.

- Exceptions handled: None

**Steps:**

| ### User Actions | ### System Responses                    |
| ---------------- | --------------------------------------- |
| - Select chord   | - Switch playback to the selected chord |

***Select Chord Progression***:

- Use Case ID: 11

- Relevant User Story IDs: 8

- Actors: User

- Preconditions: None.

- Post-conditions: None.

- Exceptions handled: None

**Steps:**

| ### User Actions           | ### System Responses                                |
| -------------------------- | --------------------------------------------------- |
| - Select chord progression | - Switch playback to the selected chord progression |

***Change playback speed***:

- Use Case ID: 12

- Relevant User Story IDs: 8

- Actors: User

- Preconditions: None.

- Post-conditions: None.

- Exceptions handled: None

**Steps:**

| ### User Actions                      | ### System Responses                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| - Increase or decrease playback speed | - If playing: Modulate playback speed based on input<br />- If paused, update speed to be used when playback starts |

***Change Playback View***:

- Use Case ID: 13

- Relevant User Story IDs: 8

- Actors: User

- Preconditions: None.

- Post-conditions: None.

- Exceptions handled: None

**Steps:**

| ### User Actions                               | ### System Responses                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| - Select Fretboard, Ledger, or Piano Roll view | - System changes current playback view to the one that the use selected |

***Toggle Playback***:

- Use Case ID: 13

- Relevant User Story IDs: 8

- Actors: User

- Preconditions: None.

- Post-conditions: None.

- Exceptions handled: The user has not selected a chord or chord progression, the system will play a default C major chord.

**Steps:**

| ### User Actions               | ### System Responses                                         |
| ------------------------------ | ------------------------------------------------------------ |
| - Toggle the play/pause button | - If the system was already playing, stop<br />- If the system was not playing, start playback |
