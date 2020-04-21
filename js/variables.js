//variabili content (condivise tra i moduli)
var divContent = document.getElementById("main_content");
var chordInSong = divContent.getElementsByClassName("chord");
var numberOfChords = divContent.getElementsByClassName("chord").length;
var englishNote = ["A", "B", "C", "D", "E", "F", "G"];
var latinNote = ["LA", "SI", "DO", "RE", "MI", "FA", "SOL"];
var englishNoteChromatic = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
var latinNoteChromatic = ["LA", "LA#", "SI", "DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#"];

var kTransp = 0; //Default 0 (valore compreso tra 0 e 12 semitoni/un ottava)

var englishNotation = true; //notazione anglosassone di default

//Autoscroll 
var scrollStarted = false;
var timeoutScroll = 50; //50 millisecondi default (può variare tra 10 e 100) 

//array per la funzione di trasposizione
var OriginalChordEng = new Array(numberOfChords);
var OriginalChordLat = new Array(numberOfChords);

//Riempi array con gli accordi iniziali sia in notazione anglosassone che latina
for(let i = 0; i < numberOfChords; ++i){
    OriginalChordEng[i] = chordInSong[i].textContent; 
}
changeNotation();
for(let i = 0; i < numberOfChords; ++i){
    OriginalChordLat[i] = chordInSong[i].textContent;
}
changeNotation();
