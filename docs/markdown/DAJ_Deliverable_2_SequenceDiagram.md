# Sequence Diagram Documents

## Find Chord

### Diagram

### Description

| #    | Subject              | Subject Action | Parameters    | Object acted upon |
| ---- | -------------------- | -------------- | ------------- | ----------------- |
| 1    | User                 | select         | note          | PianoGUI          |
| 2    | PianoGUI             | play           | note          | Client            |
| 3    | If > 2 playing notes |                |               |                   |
| 3.1  | Client               | checks         | playing notes | ChordDB           |
| 3.2  | ChordDB              | matching       | chord         | Client            |
| 3.3  | Client               | display        | chord         | PianoGUI          |
| 3    | else                 |                |               |                   |
| 3.1  | Client               | display        | nothing       | PianoGUI          |



--------------------------------

## Name

### Diagram

### Description

| #    | Subject | Subject Action | Parameters | Object acted upon |
| ---- | ------- | -------------- | ---------- | ----------------- |
|      |         |                |            |                   |
|      |         |                |            |                   |
|      |         |                |            |                   |

