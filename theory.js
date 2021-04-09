exports.theory = 
{
    keysSharp: 
    {
        roots: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        pattern: [0, 2, 2, 1, 2, 2, 2]
    },
    keysFlat: 
    {
        roots: ["C", "D\u266D", "D", "E\u266D", "E", "F", "G\u266D", "G", "A\u266D", "A", "B\u266D", "B"],
        pattern: [0, 2, 1, 2, 2, 1, 2]
    },
    majorRomanNumerals: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
    minorRomanNumerals: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'],
    midi:
    {
        A0: 21
    },
    progressions:
    {
        happy: [['M', 'm', 'M', 'M']],
        sad:[['m', 'M', 'M', 'M'], ['m', 'm', 'M', 'M']],
        hopeful: [['M', 'M', 'm', 'M']]
    }
} 