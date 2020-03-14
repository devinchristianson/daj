# Sequence Diagram Documents

## Find Chord

### Diagram

![Chord recognition Analysis Sequence model](https://raw.githubusercontent.com/devinchristianson/daj/master/docs/assets/uml/chordmatchSequenceAnalysis.png)

### Description

| #     | Subject              | Subject Action | Parameters   | Object acted upon |
| ----- | -------------------- | -------------- | ------------ | ----------------- |
| 1     | User                 | select         | key          | PianoGUI          |
| 2     | PianoGUI             | play           | key, note    | Client            |
| 2.1   | Client               | highlight      | pianoKey     | PianoGUI          |
| 3     | If > 2 playing notes |                |              |                   |
| 3.1   | Client               | check          | playingNotes | ChordDB           |
| 3.2   | If Chord Match found |                |              |                   |
| 3.2.1 | ChordDB              | matching       | chord        | Client            |
| 3.2.2 | Client               | display        | chord        | PianoGUI          |
| 3.2.3 | PianoGUI             | show           | chord        | User              |
| 3.2   | else                 |                |              |                   |
| 3.2.1 | Client               | display        | no match     | PianoGUI          |
| 3.2.2 | PianoGUI             | show           | no match     | User              |
| 3     | else                 |                |              |                   |
| 3.1   | Client               | display        | no match     | PianoGUI          |
| 3.2   | PianoGUI             | show           | no match     | User              |



--------------------------------

## Name

### Diagram

### Description

| #    | Subject | Subject Action | Parameters | Object acted upon |
| ---- | ------- | -------------- | ---------- | ----------------- |
|      |         |                |            |                   |
|      |         |                |            |                   |
|      |         |                |            |                   |

