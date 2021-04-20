var coreTheory = require('./theory');

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
        ptr = chord.includes('#') ? coreTheory.theory.keys.sharp.findIndex((element) => element === trimmedChord) : coreTheory.theory.keys.flat.findIndex((element) => element === trimmedChord);

        chordInfo.notes.push(coreTheory.theory.keys.flat[ptr]);
        chordInfo.notes.push(coreTheory.theory.keys.flat[(ptr + 3) % 12]);
        chordInfo.notes.push(coreTheory.theory.keys.flat[(ptr + 6) % 12]);
    }
    else if(chord.includes('m'))
    {
        ptr = chord.includes('#') ? coreTheory.theory.keys.sharp.findIndex((element) => element === trimmedChord) : coreTheory.theory.keys.flat.findIndex((element) => element === trimmedChord);

        chordInfo.notes.push(coreTheory.theory.keys.flat[ptr]);
        chordInfo.notes.push(coreTheory.theory.keys.flat[(ptr + 3) % 12]);
        chordInfo.notes.push(coreTheory.theory.keys.flat[(ptr + 7) % 12]);
    }
    else
    {
        ptr = chord.includes('#') ? coreTheory.theory.keys.sharp.findIndex((element) => element === trimmedChord) : coreTheory.theory.keys.flat.findIndex((element) => element === trimmedChord);

        chordInfo.notes.push(coreTheory.theory.keys.sharp[ptr]);
        chordInfo.notes.push(coreTheory.theory.keys.sharp[(ptr + 4) % 12]);
        chordInfo.notes.push(coreTheory.theory.keys.sharp[(ptr + 7) % 12]);
    }

    return chordInfo;
}
