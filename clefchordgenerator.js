var coreTheory = require('clefchordgenerator/theory');
var chord = require('clefchordgenerator/chord');
var note = require('clefchordgenerator/note');

exports.generateChordProgression = function(root, operator, adjective, mood = 'N/A') {
    var chordProgression = {progToRender: '', romanProgToRender: '', progForRNN: '', chords: [], notesInChords: []};
    var counter = 0, ptr;
    var allChords = [];

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

    const generateFourChords = function(structure = ['0', '0', '0', '0'])
    {
        let picked = new Set();

        while (counter < 4)
        {
            ptr = Math.floor(Math.random() * 100) % allChords.length;

            if(structure[counter] == '0' || 
              (structure[counter] == 'm' && allChords[ptr].includes(structure[counter])) || 
              (structure[counter] == 'M' && !allChords[ptr].includes('m')))
                if (!picked.has(ptr))
                {
                    picked.add(ptr);

                    console.log(structure[counter] + " " + mood + " " + ptr + " " + allChords[ptr]);

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
        generateFourChords();
    else
    {
        var num;

        if(mood == 'Happy')
        {
            num = Math.floor(Math.random() * 100) % coreTheory.theory.progressions.happy.length;

            generateFourChords(structure = coreTheory.theory.progressions.happy[num]);
        }
        else if(mood == 'Sad')
        {
            num = Math.floor(Math.random() * 100) % coreTheory.theory.progressions.sad.length;

            generateFourChords(structure = coreTheory.theory.progressions.sad[num]);
        }
        else if(mood == 'Hopeful')
        {
            num = Math.floor(Math.random() * 100) % coreTheory.theory.progressions.hopeful.length;

            generateFourChords(structure = coreTheory.theory.progressions.hopeful[num]);
        }
        else
        {
            console.log(mood + " is not a valid mood.");

            return {};
        }
    }

    return chordProgression;
}