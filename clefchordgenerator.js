exports.generateChordProgression = function(chosenKey, chosenAdjective) {
    var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    var majorProgression = [0, 2, 2, 1, 2, 2, 2];
    var minorProgression = [0, 2, 1, 2, 2, 1, 2];
    var chordsInProgression = [];
    var chordProgression = "";
    var counter = 0, ptr;
    let picked = new Set();

    const generateMajorProgression = function(chosenKey)
    {
        var chordsInProgression = [];
        var ptr;

        chordsInProgression.push(chosenKey + "M");

        for (ptr = 0; ptr < 12; ptr++)
            if (keys[ptr] == chosenKey)
                break;

        for (var i = 1; i < 7; i++)
        {
            ptr += majorProgression[i];

            if (i == 6)
                chordsInProgression.push(keys[ptr % 12] + "dim");
            else if (6 % (i + 1) == 0)
                chordsInProgression.push(keys[ptr % 12] + "m");
            else
                chordsInProgression.push(keys[ptr % 12] + "M");
        }

        return chordsInProgression;
    }

    const generateMinorProgression = function(chosenKey)
    {
        var chordsInProgression = [];
        var ptr;

        chordsInProgression.push(chosenKey + "m");

        for (ptr = 0; ptr < 12; ptr++)
            if (keys[ptr] == chosenKey)
                break;

        for (var i = 1; i < 7; i++)
        {
            ptr += minorProgression[i];

            if (i == 1)
                chordsInProgression.push(keys[ptr % 12] + "dim");
            else if (20 % (i + 1) == 0)
                chordsInProgression.push(keys[ptr % 12] + "m");
            else
                chordsInProgression.push(keys[ptr % 12] + "M");
        }

        return chordsInProgression;
    }

    if (chosenAdjective == "M")
        chordsInProgression = generateMajorProgression(chosenKey);
    else
        chordsInProgression = generateMinorProgression(chosenKey);

    while (counter < 4)
    {
        ptr = Math.floor(Math.random() * 100) % chordsInProgression.length;

        if (!picked.has(ptr))
        {
            picked.add(ptr);

            chordProgression += chordsInProgression[ptr];

            counter++;
        }
    }

    return chordProgression;
}