var coreTheory = require('clefchordgenerator/theory');
var chord = require('clefchordgenerator/chord');
var note = require('clefchordgenerator/note');

exports.generateChordProgression = function(root, operator, adjective, mood = 'N/A') {
    var chordProgression = {progToRender: '', romanProgToRender: '', progForRNN: '', chords: [], notesInChords: []};
    var allChords = [];
    let picked = new Set();
    var counter = 0, ptr;

    const generateAllChordsMajor = function()
    {
        var keys;

        if(operator == "#")
            keys = coreTheory.theory.keysSharp;
        else 
            keys = coreTheory.theory.keysFlat;

        for (ptr = 0; ptr < 12; ptr++)
            if (keys.roots[ptr] == root)
                break;

        if (operator == "#")
            ptr = (ptr + 1) % 12;
        else if (operator == '\u266D')
            ptr = (ptr - 1 == -1) ? 11 : (ptr - 1) % 12;

        allChords.push(keys.roots[ptr]);

        for (var i = 1; i < 7; i++)
        {
            ptr += keys.pattern[i];

            if (i == 6)
                allChords.push(keys.roots[ptr % 12] + "dim");
            else if (6 % (i + 1) == 0)
                allChords.push(keys.roots[ptr % 12] + "m");
            else
                allChords.push(keys.roots[ptr % 12]);
        }

        return allChords;
    }

    const generateAllChordsMinor = function()
    {
        var keys;

        if(operator == "#")
            keys = coreTheory.theory.keysSharp;
        else 
            keys = coreTheory.theory.keysFlat;

        for (ptr = 0; ptr < 12; ptr++)
            if (keys[ptr] == root)
                break;

        if (operator == "#")
            ptr = (ptr + 1) % 12;
        else if (operator == '\u266D')
            ptr = (ptr - 1 == -1) ? 11 : (ptr - 1) % 12;

        allChords.push(keys.roots[ptr] + "m");

        for (var i = 1; i < 7; i++)
        {
            ptr += keys.pattern[i];

            if (i == 1)
                allChords.push(keys.roots[ptr % 12] + "dim");
            else if (20 % (i + 1) == 0)
                allChords.push(keys.roots[ptr % 12] + "m");
            else
                allChords.push(keys.roots[ptr % 12]);
        }

        return allChords;
    }

    const generateFourChords = function()
    {
        while (counter < 4)
        {
            ptr = Math.floor(Math.random() * 100) % allChords.length;

            if (!picked.has(ptr))
            {
                picked.add(ptr);

                chordProgression.progToRender += allChords[ptr];
                chordProgression.progForRNN += allChords[ptr];
                chordProgression.chords.push(allChords[ptr]);

                if (allChords[ptr].includes('m') || allChords[ptr].includes('dim'))
                {
                    if(allChords[ptr].includes('dim'))
                    {
                        chordProgression.notesInChords.push(chord.get(allChords[ptr]).notes);

                        for(var ind = 0; ind < 3; ind++)
                            chordProgression.notesInChords[counter][ind] = note.midi(chordProgression.notesInChords[counter][ind], 4)
                    }
                    else
                    {
                        chordProgression.notesInChords.push(chord.get(allChords[ptr]).notes);

                        for(var ind = 0; ind < 3; ind++)
                            chordProgression.notesInChords[counter][ind] = note.midi(chordProgression.notesInChords[counter][ind], 4)
                    }

                    chordProgression.romanProgToRender += coreTheory.theory.minorRomanNumerals[ptr];
                }
                else
                {
                    chordProgression.notesInChords.push(chord.get(allChords[ptr]).notes);

                    for(var ind = 0; ind < 3; ind++)
                        chordProgression.notesInChords[counter][ind] = note.midi(chordProgression.notesInChords[counter][ind], 4)

                    chordProgression.romanProgToRender += coreTheory.theory.majorRomanNumerals[ptr];
                }

                if(counter != 3)
                {
                    chordProgression.progToRender += ' - ';
                    chordProgression.romanProgToRender += ' - ';
                }

                counter++;
            }
        }
    }

    if (adjective == "Major")
        generateAllChordsMajor();
    else
        generateAllChordsMinor();

    if(mood == 'N/A')
    {
        generateFourChords();
    }
    else
    {
        if(mood == 'Happy')
        {
        }
        else if(mood == 'Sad')
        {
        }
        else if(mood == 'Hopeful')
        {
        }
        else
        {
            // Error
        }
    }

    return chordProgression;
}