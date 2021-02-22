exports.generateChordProgression = function(chosenKey, chosenOperator, chosenAdjective) {
    var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var majorRomanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    var minorRomanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    var majorProgression = [0, 2, 2, 1, 2, 2, 2];
    var minorProgression = [0, 2, 1, 2, 2, 1, 2];
    var chordsInProgression = [];
    var chordProgression = [];
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

    chordProgression.push("");
    chordProgression.push("");
    chordProgression.push("");

    while (counter < 4)
    {
        ptr = Math.floor(Math.random() * 100) % chordsInProgression.length;

        if (!picked.has(ptr))
        {
            picked.add(ptr);

            chordProgression[0] += chordsInProgression[ptr];
            chordProgression[2] += chordsInProgression[ptr];
 
            if (chordsInProgression[ptr].includes('m') || chordsInProgression[ptr].includes('dim'))
                chordProgression[1] += minorRomanNumerals[ptr];
            else
                chordProgression[1] += majorRomanNumerals[ptr];

            if(counter != 3)
            {
                chordProgression[0] += ' - ';
                chordProgression[1] += ' - ';
            }

            counter++;
        }
    }

    return chordProgression;
}