var coreTheory = require('clefchordgenerator/theory');

exports.get = function(chord) 
{
    var chordInfo = 
    {
        notes: []
    };

    var trimmedChord = chord.includes('#') || chord.includes('\u266D') ? chord.slice(0, 2) : chord.slice(0, 1);
    var ptr;

    if(chord.includes('dim'))   
    {
        ptr = chord.includes('#') ? coreTheory.theory.keysSharp.roots.findIndex((element) => element === trimmedChord) : coreTheory.theory.keysFlat.roots.findIndex((element) => element === trimmedChord);

        chordInfo.notes.push(coreTheory.theory.keysFlat.roots[ptr]);
        chordInfo.notes.push(coreTheory.theory.keysFlat.roots[(ptr + 3) % 12]);
        chordInfo.notes.push(coreTheory.theory.keysFlat.roots[(ptr + 6) % 12]);
    }
    else if(chord.includes('m'))
    {
        ptr = chord.includes('#') ? coreTheory.theory.keysSharp.roots.findIndex((element) => element === trimmedChord) : coreTheory.theory.keysFlat.roots.findIndex((element) => element === trimmedChord);

        chordInfo.notes.push(coreTheory.theory.keysFlat.roots[ptr]);
        chordInfo.notes.push(coreTheory.theory.keysFlat.roots[(ptr + 3) % 12]);
        chordInfo.notes.push(coreTheory.theory.keysFlat.roots[(ptr + 7) % 12]);
    }
    else
    {
        ptr = chord.includes('#') ? coreTheory.theory.keysSharp.roots.findIndex((element) => element === trimmedChord) : coreTheory.theory.keysFlat.roots.findIndex((element) => element === trimmedChord);

        chordInfo.notes.push(coreTheory.theory.keysSharp.roots[ptr]);
        chordInfo.notes.push(coreTheory.theory.keysSharp.roots[(ptr + 4) % 12]);
        chordInfo.notes.push(coreTheory.theory.keysSharp.roots[(ptr + 7) % 12]);
    }

    return chordInfo;
}