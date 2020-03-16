# Sequence Diagram Documents

## Find Chord

### Analysis Diagram

![Chord recognition Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/chordmatchSequenceAnalysis.png)

### Description

| #     | Subject              | Subject Action | Parameters | Object acted upon |
| ----- | -------------------- | -------------- | ---------- | ----------------- |
| 1     | User                 | select         | key        | PianoGUI          |
| 2     | PianoGUI             | play           | key        | Client            |
| 2.1   | Client               | highlight      | pianoKey   | PianoGUI          |
| 3     | If > 2 playing notes |                |            |                   |
| 3.2   | If Chord Match found |                |            |                   |
| 3.2.2 | Client               | display        | chord      | PianoGUI          |
| 3.2.3 | PianoGUI             | show           | chord      | User              |
| 3.2   | else                 |                |            |                   |
| 3.2.1 | Client               | display        | no match   | PianoGUI          |
| 3.2.2 | PianoGUI             | show           | no match   | User              |
| 3     | else                 |                |            |                   |
| 3.1   | Client               | display        | no match   | PianoGUI          |
| 3.2   | PianoGUI             | show           | no match   | User              |

### Design Diagram

![Chord recognition Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/chordmatchSequenceDesign.png)

--------------------------------

## Sign in with Google

### Analysis Diagram

### Description

| #     | Subject           | Subject Action | Parameters     | Object acted upon |
| ----- | ----------------- | -------------- | -------------- | ----------------- |
| 1     | User              | select         | Sign-in        | GUI               |
| 1.1   | GUI               | sign-in        | Google         | Client            |
| 2     | Client            | redirect to    | Google sign in | GoogleSSO         |
| 2.1   | User              | Sign-in        | Google account | GoogleSSO         |
| 4.    | GoogleSSO         | pass           | token          | Client            |
| 4.1   | Client            | verify         | token          | Backend           |
| 4.2   | If token is valid |                |                |                   |
| 4.2.1 | Backend           | pass           | user-data      | Client            |
| 4.2.2 | Client            | message        | login success  | GUI               |
| 4.2.3 | GUI               | alert          | logged in!     | User              |
| 4.2   | else              |                |                |                   |
| 4.2.1 | Backend           | pass           | user-data      | Client            |
| 4.2.2 | Client            | message        | login failure  | GUI               |
| 4.2.3 | GUI               | alert          | login failed   | User              |

### Design Diagram