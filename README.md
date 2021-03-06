# ChordGenerationLibrary

# Summary
This is the repository for the Clef Chord Generation algorithm. It currently takes as input a key, an "operator" (sharp or flat), and an "adjective" (major or minor).

```javascript
generateChordProgression = function(chosenKey, chosenOperator, chosenAdjective) {
  <code>
}
```

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

The package features a single callable function that returns an object containing three strings and an array of strings. The object is structured like so:

```javascript
var chordProgression = {progToRender: '', romanProgToRender: '', progForRNN: '', chords: []};
```

An example of the returned object is shown below.

```
Object {
  "chords": Dm,F,C,Bdim
  "progForRNN": "DmFCBdim",
  "progToRender": "Dm - F - C - Bdim",
  "romanProgToRender": "ii - IV - I - vii",
}
```
