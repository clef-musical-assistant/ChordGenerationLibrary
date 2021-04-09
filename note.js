var coreTheory = require('./theory');

exports.midi = function(note, octave = 0)
{
    var midiVal = coreTheory.theory.midi.A0;
    var index;

    index = note.includes('#') ? coreTheory.theory.keysSharp.roots.findIndex((element) => element === note) : coreTheory.theory.keysFlat.roots.findIndex((element) => element === note);

    midiVal += (12 * octave) + (index - 9);

    return midiVal;
}