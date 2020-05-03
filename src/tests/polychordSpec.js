describe('main', function () {
    describe('playNote()', function () {
        it('should add same octave to playing notes', function () {
            assert.equal(playNote("KeyA"), "C4");
        });
        it('should add same octave to playing notes', function () {
            assert.equal(playNote("KeyK"), "C5");
        });
    });
    describe('stopNote()', function () {
        it('should remove same octave from playing notes', function () {
            assert.equal(stopNote("KeyA"), "C4");
        });
        it('should remove same octave from playing notes', function () {
            assert.equal(stopNote("KeyK"), "C5");
        });
    });
	describe('onMidiReject()', function () {
        it('should prove have midi access', function () {
            assert.notEqual(midiAccess, null);
        });
    });
	describe('startMetronome()', function () {
        it('should prove have midi access', function () {
            assert.equal(true, (bpm > 0) && (bpm < 1000));
        });
    });
})