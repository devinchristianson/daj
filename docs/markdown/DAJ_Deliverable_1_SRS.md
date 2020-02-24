##

# Software Requirements Specification

## for

# PolyChord

Version 1.0 approved

Prepared by author

DAJ

13 February 2020

Table of Contents

| Table of Contents        ii |
| --- |
| Revision History        ii |
|                 1 |
| 1.1        Purpose        |
| 1.2        Document Conventions        |
| 1.3        Intended Audience and Reading Suggestions        |
| 1.4        Product Scope        |
| 1.5        References        |
|                 2 |
| 2.1        Product Perspective        |
| 2.2        Product Functions        |
| 2.3        User Classes and Characteristics        |
| 2.4        Operating Environment        |
| 2.5        Design and Implementation Constraints        |
| 2.6        User Documentation        |
| 2.7        Assumptions and Dependencies        |
|                 3 |
| 3.1        User Interfaces        |
| 3.2        Hardware Interfaces        |
| 3.3        Software Interfaces        |
| 3.4        Communications Interfaces        |
|                 4 |
| 4.1        System Feature 1        |
| 4.2        System Feature 2 (and so on)        |
|                 4 |
| 5.1        Performance Requirements        |
| 5.2        Safety Requirements        |
| 5.3        Security Requirements        |
| 5.4        Software Quality Attributes        |
| 5.5        Business Rules        |
|                 5 |
| Appendix A: Glossary        5 |
| Appendix B: Analysis Models        5 |
| Appendix C: To Be Determined List        6 |



Revision History

| Name | Date | Reason For Changes | Version |
| --- | --- | --- | --- |
|   |   |   |   |
|   |   |   |   |



# 1. Introduction

## 1.1 Purpose

​	This Software Requirements Specification documents the whole of revision 0.0.1 of the PolyChord application. This includes the base framework of PolyChord, as well as it's core features, such as the keyboard interface with synth capabilities, and basic chord recognition.

*Identify the product whose software requirements are specified in this document, including the revision or release number. Describe the scope of the product that is covered by this SRS, particularly if this SRS describes only part of the system or a single subsystem.*

## 1.2 Document Conventions

This has been left as I don't know what conventions will be needed or chosen in the following document. *Describe any standards or typographical conventions that were followed when writing this SRS, such as fonts or highlighting that have special significance. For example, state whether priorities  for higher-level requirements are assumed to be inherited by detailed requirements, or whether every requirement statement is to have its own priority.*

## 1.3 Intended Audience and Reading Suggestions

​	This Software Requirements Specification is intended for developers, project managers,  and marketing staff. The document is laid out in a number of multi-part sections. 

​	The Overall Description section covers the product perspective, product functions, user types, operating environment and constraints, user documentation plans, assumptions and dependencies. The product functions, user types, operating environment and constraints, user documentation plans, and assumptions sub-sections are important reading for product managers, the product functions, operating environment and constraints, assumptions and dependencies are important reading for developers, and the product perspective, product functions, user types sub-sections are important reading for marketing staff. 

​	The External Interface Requirements section covers the user Interfaces, hardware interfaces, and communications interfaces. All three sub-sections are important reading for project manager and developers, while the user interface sub-section is useful reading for the marketing department. 

​	The System Features section covers the major features of PolyChord, and all its subsections are important reading for developers and project managers alike.

The Other Non-Functional Requirements section covers the performance, safety, security, and software quality requirements, as well as any business requirements that may be in play. This is important for project managers and developers.

*Describe the different types of reader that the document is intended for, such as developers, project managers, marketing staff, users, testers, and documentation writers. Describe what the rest of this SRS contains and how it is organized. Suggest a sequence for reading the document, beginning with the overview sections and proceeding through the sections that are most pertinent to each reader type.*

## 1.4 Product Scope

​	PolyChord is a interactive music theory learning tool, that is designed to be more engaging and dynamic than more traditional music theory tools out there. What sets PolyChord apart is that it identifies chords as they are played, allowing the user more freedom than a traditional chord identification or learning tool. PolyChord is not intended to be a full-featured online synthesizer, nor is intended to be a fully-featured music theory learning classroom. PolyChord aims to be a supplement for these other resources, providing an easy way to re-enforce or refresh music theory know, or gain a working knowledge of basic music theory through experimentation. 

*Provide a short description of the software being specified and its purpose, including relevant benefits, objectives, and goals. Relate the software to corporate goals or business strategies. If a separate vision and scope document is available, refer to it rather than duplicating its contents here.*

## 1.5 References

***Fill in these references once they are made. We will likely refer to a minimum of the use case models document***

List any other documents or Web addresses to which this SRS refers. These may include user interface style guides, contracts, standards, system requirements specifications, use case documents, or a vision and scope document. Provide enough information so that the reader could access a copy of each reference, including title, author, version number, date, and source or location.

# 2. Overall Description

## 2.1 Product Perspective

PolyChord is intended to be a standalone music theory experimentation product, and is not part of a larger system, or a descendant of an existing product.

***Not sure if we need more than this ^ here***

*Describe the context and origin of the product being specified in this SRS. For example, state whether this product is a follow-on member of a product family, a replacement for certain existing systems, or a new, self-contained product. If the SRS defines a component of a larger system, relate the requirements of the larger system to the functionality of this software and identify interfaces between the two. A simple diagram that shows the major components of the overall system, subsystem interconnections, and external interfaces can be helpful.*

## 2.2 Product Functions

The major functions the product must perform, or allow the user to perform, are as follows:

- PolyChord must allow the user to play a piano-style synth via a keyboard or MIDI device input.
- PolyChord must allow the user to play selected chord by name to be show/played.
- PolyChord must display chords by name as they are played by the user.
- PolyChord must allow the user to select a Chord progression to be show/played.
- PolyChord must display chord progression suggestions based on the chords the user is playing, and the desired "feel" selected by the user.

*Summarize the major functions the product must perform or must let the user perform. Details will be provided in Section 3, so only a high level summary (such as a bullet list) is needed here. Organize the functions to make them understandable to any reader of the SRS. A picture of the major groups of related requirements and how they relate, such as a top level data flow diagram or object class diagram, is often effective.*

## 2.3 User Classes and Characteristics

The general user classes and characteristics are as follows:

- Casual User: This group of users is likely to experiment with many of the product features, but less likely to make wide or continued use of any of them. To maximize their user experience, all features must be as intuitive and straightforward to use as possible

- Beginner/Novice level of knowledge in music theory: This group of users is the most likely to use the chord play-back feature to learn new chords, and the chord recognition feature to practice chords. To maximize their user experience, the chord playback feature must not require any prior knowledge of music theory to use, and the chord recognition feature must be responsive. This level of user may also experiment with the chord progression suggestion tool, so that tool must be able to display the chords on a "piano roll" style output, as that is the type of output a user with this level of knowledge is most likely to use.
- Intermediate level of knowledge in music theory: This group is the most likely to use the chord progression playback and progression suggestion tools, for both learning purposes as well as reference purposes, so the progressions must be based on the chords/key they are playing in, and the playback tool must provide the chords on a staff as well as "piano roll" style, as this level of user is more likely to make use of the "ledger-line" display than the "piano roll" display.
- Advanced level of knowledge in music theory: This group is most likely to use PolyChord as a reference tool, in the event that they have forgotten a chord or chord progression, or just want to check their work. To maximize their user experience, all tools must be capable of "ledger-line" style output, as that is the type of output that they are the most comfortable with. This is also the level of user who is most likely to use a MIDI device for input, so MIDI input should be an option for all  keyboard-input type tools.

*Identify the various user classes that you anticipate will use this product. User classes may be differentiated based on frequency of use, subset of product functions used, technical expertise, security or privilege levels, educational level, or experience. Describe the pertinent characteristics of each user class. Certain requirements may pertain only to certain user classes. Distinguish the most important user classes for this product from those who are less important to satisfy.*

## 2.4 Operating Environment

​	PolyChord is a web application, and therefore is inherently fairly operating-system agnostic, and aims to support as many browsers as possible. For features other than Midi support, universal support of all modern browsers is trivial. For Midi support, only newer versions of Chrome, and Safari support web Midi natively, with some others requiring a 3rd party extension for Midi support. Unfortunately, due to the nature of the Midi API, there is not much PolyChord can do in this regard other than fail gracefully in the face of lack of Midi support, and continue functioning normally otherwise.

*Describe the environment in which the software will operate, including the hardware platform, operating system and versions, and any other software components or applications with which it must peacefully coexist.*

## 2.5 Design and Implementation Constraints

​	There are few implementation constraints for the application as a whole, as it only has the standard requirements for a modern website, requirements that are met by all modern browsers. For Midi support specifically, there are a few implementation constraints. First, as mentioned in the previous sub-section, WebMidi is not supported on all modern browsers. Second, WebMidi has some inherent security concerns with "sysEx" webMidi calls. In using the WebMidi.js framework, the initial matter of disabling "sysEx" calls is taken for us, as it is disabled by default, though there are still further actions to mitigate this vulnerability: in order to satisfy the requirements of some modern browsers, and prevent man in the middle attacks that could erroneously enable "sysEx" calls, PolyChord must be served elusively over HTTPS. 

**any regulations we need to mention here?**

Describe any items or issues that will limit the options available to the developers. These might include: corporate or regulatory policies; hardware limitations (timing requirements, memory requirements); interfaces to other applications; specific technologies, tools, and databases to be used; parallel operations; language requirements; communications protocols; security considerations; design conventions or programming standards (for example, if the customer\'s organization will be responsible for maintaining the delivered software).*

## 2.6 User Documentation

​	PolyChord's main documentation method is built-in tutorials, with the goal that the user-interface complexity is kept low enough that the built-in tutorials will be sufficient, and no further external documentation is needed. These tutorials will cover the usage basics for all major features of PolyChord, and a tutorial on how to enable and troubleshoot the MIDI device support that PolyChord provides. These tutorials will be both one-time tutorials when a user selects a feature for the first time, and will be able to be recalled within PolyChord's user 

*List the user documentation components (such as user manuals, on-line help, and tutorials) that will be delivered along with the software. Identify any known user documentation delivery formats or standards.*

## 2.7 Assumptions and Dependencies

### Assumptions

***not really sure what to put here, not something we've really discussed***

### Dependencies

#### Tone.js

​	PolyChord relies on Tone.js for client-side sound synthesis and playback. Tone.js is a fairly popular, widely used framework for sound synthesis and modification on the client side, and is licensed under an MIT license, meaning that is free for all types of use, but provided without any functionality guarantees. Tone.js's popularity and wide adoption is the reason it was chosen over competitors, and it's use allows for much faster, more reliable development, when compared to writing the sound synthesis logic from scratch.

#### WebMidi API

​	PolyChord relies on the WebMIDI API specification for Midi support. This accepted Midi implemenation for web, and it has been widely adopted. WebMidi is supported in Chrome, and while it still does not have native support in FireFox, there are a number of extensions for FireFox, and there are plans to implement the API natively in FireFox in the future.

#### WebMidi.js

​	PolyChord relies on WebMidi.js for Midi support. WebMidi.js is a fairly popular framework for interacting with the WebMidi API at a higher level.

*List any assumed factors (as opposed to known facts) that could affect the requirements stated in the SRS. These could include third-party or commercial components that you plan to use, issues around the development or operating environment, or constraints. The project could be affected if these assumptions are incorrect, are not shared, or change. Also identify any dependencies the project has on external factors, such as software components that you intend to reuse from another project, unless they are already documented elsewhere (for example, in the vision and scope document or the project plan).*

# 3. External Interface Requirements

## 3.1 User Interfaces

PolyChord will have a Keyboard that will react to input from either a MIDI Keyboard or computer keyboard. There will also be a main menu containg tutorials in music theory and a chord explorer interface, options to save a chord progression or view saved chord progressions and all other core features.
There will also be a seperate menu which allows for swapping between various samples such as "Piano", "Guitar", and "Drums" by the user clicking on the sample type or by typing in the corresponding sample name or index. This menu will also have an option to swap the octave that is being used by the piano in the case that they are using a computer keyboard.


*Describe the logical characteristics of each interface between the software product and the users. This may include sample screen images, any GUI standards or product family style guides that are to be followed, screen layout constraints, standard buttons and functions (e.g., help) that will appear on every screen, keyboard shortcuts, error message display standards, and so on. Define the software components for which a user interface is needed. Details of the user interface design should be documented in a separate user interface specification.*

## 3.2 Hardware Interfaces

Supported Devices: MIDI Controller, primarily MIDI Keyboards and computer keyboards using the top 2 rows (" a " to " ' " and " q " to " \ " to simulate a MIDI Controller.
PolyChord will accept input from a MIDI Keyboard or computer keyboard using the https://github.com/djipco/webmidi webmidi API. Once the input has been interpreted PolyChord will display the notes on an on-screen keyboard and play the corresponding note through the user's computer. 

*Describe the logical and physical characteristics of each interface between the software product and the hardware components of the system. This may include the supported device types, the nature of the data and control interactions between the software and the hardware, and communication protocols to be used.*

## 3.3 Software Interfaces

PolyChord will be using the most recent tone.js (https://tonejs.github.io/) to play back music to the user including various types of samples and synths. It will take the inputs from the program after input has been taken in and parsed or when a user requests for a chord/chord progression to be played back to them. It handles tempo, notes, various sound samples, note durations and more that we will be using for PolyChord.
The most recent webmidi.js (https://github.com/djipco/webmidi) will be used for the receiving of midi input. It works natively in Chrome, Opera, and Android, but can also work in Internet Explorer, Firefox ≤ v51, and Safari with some plugins from https://jazz-soft.net/ and https://cwilso.github.io/WebMIDIAPIShim/. This will allow for the use of any MIDI Controllers that a user may want to utilize.

*Describe the connections between this product and other specific software components (name and version), including databases, operating systems, tools, libraries, and integrated commercial components. Identify the data items or messages coming into the system and going out and describe the purpose of each. Describe the services needed and the nature of communications. Refer to documents that describe detailed application programming interface protocols. Identify data that will be shared across software components. If the data sharing mechanism must be implemented in a specific way (for example, use of a global data area in a multitasking operating system), specify this as an implementation constraint.*

## 3.4 Communications Interfaces

Polychord will work over http and https as it is a web application, but as of now will not need to communicate in any way other than the connection between the user and the server.

*Describe the requirements associated with any communications functions required by this product, including e-mail, web browser, network server communications protocols, electronic forms, and so on. Define any pertinent message formatting. Identify any communication standards that will be used, such as FTP or HTTP. Specify any communication security or encryption issues, data transfer rates, and synchronization mechanisms.*

# 4. System Features

This template illustrates organizing the functional requirements for the product by system features, the major services provided by the product. You may prefer to organize this section by use case, mode of operation, user class, object class, functional hierarchy, or combinations of these, whatever makes the most logical sense for your product.

## 4.1 Website

### 4.1.1 Description and Priority

PolyChord will provide a lightweight, multipurpose website that will work in major web browsers and a method for mobile users to use the system. With this feature, we can begin to implement other features.
Priority: High

### 4.1.2 Stimulus/Response Sequences

Not applicable

### 4.1.3 Functional Requirements

SITE-1: The system shall operate on major web browsers.

SITE-2: The system shall be compatible with mobile devices.

SITE-3: The system shall adopt a color scheme that is easy to use in the dark.

## 4.2 Chords

### 4.2.1 Description and Priority

Users will be able to play chords and have relevant information about it displayed. This is one of our primary features and can be implemented relatively early.
Priority: High

### 4.2.2 Stimulus/Response Sequences

Stimulus:	User plays a chord.
Response:	System looks up information about the chord and displays it.

Stimulus: 	User plays a chord incorrectly.
Response:	System looks up similar chords and displays which notes the user is not supposed to be playing.

### 4.2.3 Functional Requirements

CHRD-1: The system shall detect chords that the user is playing.

CHRD-2: The system shall display the name of a chord that the user is playing.

CHRD-3: The system shall display the tonic of an input chord.

CHRD-4: The system shall display played chords on a music staff.

CHRD-5: The system shall display played chords on a fretboard.

CHRD-6: The system shall display the key that a detected chord is in.

CHRD-7: The system shall suggest chords close to a chord that is incorrectly played.

## 4.3 Progressions

### 4.3.1 Description and Priority

Users will be able to see various chord progressions based off of the chords they have played. This feature is one of our major features, but requires other features to be implemented first to function.
Priority: Medium

### 4.3.2 Stimulus/Response Sequences

Stimulus: 	User plays chords.
Repsonse: 	System finds progressions that contain those chords and displays those progressions.

Stimulus:	User selects chords for playback.
Response:	System finds progressions that contain those chords and displays those progressions.

### 4.3.3 Functional Requirements

PRGSN-1: The system shall suggest chord progressions to the user based on the chords they are playing.

PRGSN-2: The system shall suggest chord progressions to the user based on selected chords.

PRGSN-3: The system shall display songs with similar chord progressions to the selected progression.

## 4.4 User Accounts

### 4.4.1 Description and Priority

Users will be able to create accounts to track statistics and save music loops and other settings. These are important to the system, but rely on all other aspects to be implemented first.
Priority: Low

### 4.4.2 Stimulus/Response Sequences

Stimulus:	User saves a chord progression.
Response:	System prepares a file the user can download containing information about the chord progression.
Stimulus:	User uploads a file they have downloaded from PolyChord.
Response:	Systems determines what information is in the file and changes the website to the display contained in the file.

Stimulus:	User submits a bug report.
Response:	System forwards the report to the developers.

### 4.4.3 Functional Requirements

ACCT-1: The system shall allow the user to save chord progressions.

ACCT-2: The system shall allow the user to import settings.

ACCT-3: The system shall allow the user to report bugs.

ACCT-4: The system shall implement sight reading excercises.

ACCT-5: The system shall implement chord detection excercises.

ACCT-6: The system shall display chord progressions from uploaded files.

ACCT-7: The system shall give the user access to music theory lessons.

ACCT-8: The system shall display statistics for a user in training excercises.

## 4.5 Musical Settings

### 4.5.1 Description and Priority

Users will be able to change the settings of aspects of the music to their liking, as well as input music notes using various methods. These features are important to the final product, but rely on many other aspects that will have to be implemented first.
Priority: Medium

### 4.5.2 Stimulus/Response Sequences

Stimulus:	The user changes a setting.
Response:	The system updates the display for the user and saves the current settings.

### 4.5.3 Functional Requirements

MSET-1: The system shall allow input from a keyboard.

MSET-2: The system shall allow input from MIDI instruments.

MSET-3: The system shall play a chosen chord progression on a loop.

MSET-4: The system shall allow a user to play melodies over a progression loop.

MSET-5: The system shall allow the user to change the ledger clef.

MSET-6: The system shall have a metronome.

MSET-7: The system shall allow the user to play looped drum patterns with their input.

MSET-8: The system shall allow the user to change the octave.

MSET-9: The system shall display notes on ledger lines.

# 5. Other Nonfunctional Requirements

## 5.1 Performance Requirements

PERF-1: The system shall recognize a chord within 2 seconds 99% of the time.

PERF-2: The system shall display chord progressions within 3 seconds 99% of the time.

PERF-3: The system shall begin a file download within 1 second of a request 99% of the time.

PERF-4: The system shall correctly identify chords 99% of the time.

## 5.2 Safety Requirements

No safety requirements have been identified.

## 5.3 Security Requirements

SEC-1: The system shall require all users to log in for all operations.

SEC-2: The system shall not place identifying information into downloaded files.

## 5.4 Software Quality Attributes

Availability: The system should be available during school hours, so teachers can use it and in the evening, so people home from work can use it.
Correctness: The system should correctly identify chords.
Portability: The system should be available on different popular operating systems and web browsers.
Usability: The system should be fully functional to a user without extensive training.

## 5.5 Business Rules

No business rules have been identified.

# 6. Other Requirements

Define any other requirements not covered elsewhere in the SRS. This might include database requirements, internationalization requirements, legal requirements, reuse objectives for the project, and so on. Add any new sections that are pertinent to the project.

Appendix A: Glossary

Define all the terms necessary to properly interpret the SRS, including acronyms and abbreviations. You may wish to build a separate glossary that spans multiple projects or the entire organization, and just include terms specific to a single project in each SRS.

Appendix B: Analysis Models

Optionally, include any pertinent analysis models, such as data flow diagrams, class diagrams, state-transition diagrams, or entity-relationship diagrams.

Appendix C: To Be Determined List

Collect a numbered list of the TBD (to be determined) references that remain in the SRS so they can be tracked to closure.
