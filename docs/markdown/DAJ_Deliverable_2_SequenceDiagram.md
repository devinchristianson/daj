# Sequence Diagram Documents

## Find Chord

### Analysis Diagram

![Chord recognition Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/chordmatchSequenceAnalysis.png)

<div style="page-break-after: always;"></div>

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

<div style="page-break-after: always;"></div>

## Sign in with Google

### Analysis Diagram

![Sign in with Google Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/signinwgoogleSequenceAnalysis.png)

<div style="page-break-after: always;"></div>

### Description

| #     | Subject           | Subject Action | Parameters     | Object acted upon |
| ----- | ----------------- | -------------- | -------------- | ----------------- |
| 1     | User              | select         | Sign-in        | GUI               |
| 1.1   | GUI               | sign-in        | Google         | GoogleSSO         |
| 2.1   | User              | sign-in        | Google account | GoogleSSO         |
| 4.    | GoogleSSO         | onSignOn       | googleUser     | Client            |
| 4.1   | Client            | verify         | token          | Backend           |
| 4.2   | If token is valid |                |                |                   |
| 4.2.1 | Backend           | pass           | user-data      | Client            |
| 4.2.2 | Client            | message        | login success  | GUI               |
| 4.2.3 | GUI               | message        | logged in      | User              |
| 4.2   | else              |                |                |                   |
| 4.2.1 | Backend           | message        | token invalid  | Client            |
| 4.2.2 | Client            | message        | login failure  | GUI               |
| 4.2.3 | GUI               | message        | login failed   | User              |

### Design Diagram

![Sign in with Google Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/signinwgoogleSequenceDesign.png)

--------------------------------

<div style="page-break-after: always;"></div>

## Upload Progression

### Analysis Diagram

![Upload Progression Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/uploadprogressionSequenceAnalysis.png)

### Description

| #     | Subject           | Subject Action | Parameters     | Object acted upon |
| ----- | ----------------- | -------------- | -------------- | ----------------- |
| 1     | User              | upload         | Progression        | GUI               |
| 2   | GUI               | send        | Progression         | Client         |
| 3   | Client              | send        | Progression | FileChecker         |
| 4.1    | If progression is valid         |        |      |             |
| 4.1.1| FileChecker           | returns           | message      | client            |
| 4.1.2 | Client            | displays        | message  | GUI               |
| 4.2   | else              |                |                |                   |
| 4.2.1| FileChecker           | returns           | message      | client            |
| 4.2.2 | Client            | displays        | message  | GUI               |

### Design Diagram

![Upload Progression Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/uploadprogressionSequenceDesign.png)

## Download Progression

### Analysis Diagram

![Upload Progression Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/saveprogressionSequenceAnalysis.png)

### Description

| #     | Subject           | Subject Action | Parameters     | Object acted upon |
| ----- | ----------------- | -------------- | -------------- | ----------------- |
| 1     | User              | save         | Progression        | GUI               |
| 2   | GUI               | send        | Progression         | Client         |
| 3.1    | If progression is valid         |        |      |             |
| 3.1.1| Client           | displays           | message      | GUI            |
| 3.2   | else              |                |                |                   |
| 3.2.1| Client           | sends           | Progression      | FileBuilder            |
| 3.2.2 | FileBuilder            | returns        | file  | Client               |
| 3.2.3 | Client            | returns        | file  | GUI               |
| 3.2.4 | GUI            | sends        | file  | User               |

### Design Diagram

![Upload Progression Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/saveprogressionSequenceDesign.png)