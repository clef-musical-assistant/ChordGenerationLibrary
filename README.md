# ChordGenerationLibrary

# Summary
This is the repository for the Clef Chord Generation algorithm. It's a simply algorithm that (currently) takes as input a key, an "operator" (sharp or flat), and an "adjective" (major or minor). 

You utilize the library within your project as an object with a single public function. It'll return an object with various representations of the chord progression generated.

# Utilization

First, import the library using the ```npm``` command:

```
npm i clefchordgenerator
```

You then include the library in your project as you would any node module:

```javascript
import sampleName from 'clefchordgenerator';
```

The package features a single callable function,```generateChordProgression(chosenKey, chosenOperator, chosenAdjective)```, that returns an object containing three strings. The object is structured like so:

```javascript
var chordProgression = {progToRender: '', romanProgToRender: '', progForRNN: ''};
```
