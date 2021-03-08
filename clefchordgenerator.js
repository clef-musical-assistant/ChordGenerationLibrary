var chord = require("@tonaljs/tonal").Chord;
var note = require("@tonaljs/tonal").Note;

exports.generateChordProgression = function(chosenKey, chosenOperator, chosenAdjective) {
    var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var majorRomanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    var minorRomanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    var majorProgression = [0, 2, 2, 1, 2, 2, 2];
    var minorProgression = [0, 2, 1, 2, 2, 1, 2];
    var chordsInProgression = [];
    var chordProgression = {progToRender: '', romanProgToRender: '', progForRNN: '', chords: [], notesInChords: []};
    let picked = new Set();
    var counter = 0, ptr;

    const generateMajorProgression = function()
    {
        var chordsInProgression = [];
        var ptr;

        for (ptr = 0; ptr < 12; ptr++)
            if (keys[ptr] == chosenKey)
                break;

        if (chosenOperator == "#")
            ptr = (ptr + 1) % 12;
        else if (chosenOperator == '\u266D')
            ptr = (ptr - 1 == -1) ? 11 : (ptr - 1) % 12;

        chordsInProgression.push(keys[ptr]);

        for (var i = 1; i < 7; i++)
        {
            ptr += majorProgression[i];

            if (i == 6)
                chordsInProgression.push(keys[ptr % 12] + "dim");
            else if (6 % (i + 1) == 0)
                chordsInProgression.push(keys[ptr % 12] + "m");
            else
                chordsInProgression.push(keys[ptr % 12]);
        }

        return chordsInProgression;
    }

    const generateMinorProgression = function()
    {
        var chordsInProgression = [];
        var ptr;

        for (ptr = 0; ptr < 12; ptr++)
            if (keys[ptr] == chosenKey)
                break;
        if (chosenOperator == "#")
            ptr = (ptr + 1) % 12;
        else if (chosenOperator == '\u266D')
            ptr = (ptr - 1 == -1) ? 11 : (ptr - 1) % 12;

        chordsInProgression.push(keys[ptr] + "m");

        for (var i = 1; i < 7; i++)
        {
            ptr += minorProgression[i];

            if (i == 1)
                chordsInProgression.push(keys[ptr % 12] + "dim");
            else if (20 % (i + 1) == 0)
                chordsInProgression.push(keys[ptr % 12] + "m");
            else
                chordsInProgression.push(keys[ptr % 12]);
        }

        return chordsInProgression;
    }

    if (chosenAdjective == "Major")
        chordsInProgression = generateMajorProgression();
    else
        chordsInProgression = generateMinorProgression();

    while (counter < 4)
    {
        ptr = Math.floor(Math.random() * 100) % chordsInProgression.length;

        if (!picked.has(ptr))
        {
            picked.add(ptr);

            chordProgression.progToRender += chordsInProgression[ptr];
            chordProgression.progForRNN += chordsInProgression[ptr];
            chordProgression.chords.push(chordsInProgression[ptr]);
 
            if (chordsInProgression[ptr].includes('m') || chordsInProgression[ptr].includes('dim'))
            {
                if(chordsInProgression[ptr].includes('dim'))
                {
                    chordProgression.notesInChords.push(chord.get(chordsInProgression[ptr]).notes);

                    for(var ind = 0; ind < 3; ind++)
                        chordProgression.notesInChords[counter][ind] = note.midi(chordProgression.notesInChords[counter][ind] + "4")
                }
                else
                {
                    chordProgression.notesInChords.push(chord.get(chordsInProgression[ptr].substring(0, chordsInProgression[ptr].length-1) + "min").notes);

                    for(var ind = 0; ind < 3; ind++)
                        chordProgression.notesInChords[counter][ind] = note.midi(chordProgression.notesInChords[counter][ind] + "4")
                }
                chordProgression.romanProgToRender += minorRomanNumerals[ptr];
            }
            else
            {
                chordProgression.notesInChords.push(chord.get(chordsInProgression[ptr]).notes);

                for(var ind = 0; ind < 3; ind++)
                    chordProgression.notesInChords[counter][ind] = note.midi(chordProgression.notesInChords[counter][ind] + "4")

                chordProgression.romanProgToRender += majorRomanNumerals[ptr];
            }

            if(counter != 3)
            {
                chordProgression.progToRender += ' - ';
                chordProgression.romanProgToRender += ' - ';
            }

            counter++;
        }
    }

    return chordProgression;
}
