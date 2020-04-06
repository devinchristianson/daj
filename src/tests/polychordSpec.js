describe('main', function () {
    describe('playNote()', function () {
        it('should add same octave to playing notes', function () {
            assert.equal(playNote("C4"), "C4");
        });
        it('should add same octave to playing notes', function () {
            assert.equal(playNote("C5"), "C5");
        });
    });
    describe('stopNote()', function () {
        it('should remove same octave from playing notes', function () {
            assert.equal(stopNote("C4"), "C4");
        });
        it('should remove same octave from playing notes', function () {
            assert.equal(stopNote("C5"), "C5");
        });
    });
})