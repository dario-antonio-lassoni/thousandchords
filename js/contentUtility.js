//Autoscroll
function startScroll() { 
    scroll = setInterval(function(){ 
        window.scrollBy(0, 1); 
    }, timeoutScroll);
    scrollStarted = true;
    document.getElementById("start_stop_scroll").onclick = stopScroll;
    document.getElementById("start_stop_scroll").textContent = "Stop";
}

function stopScroll() {
    clearInterval(scroll);
    scrollStarted = false;
    document.getElementById("start_stop_scroll").onclick = startScroll;
    document.getElementById("start_stop_scroll").textContent = "Start";
}

function increaseSpeedScroll(){
    if(timeoutScroll != 0){
        if(document.getElementById("sub_scroll").disabled)
            document.getElementById("sub_scroll").removeAttribute("disabled");

        if(scrollStarted){
            stopScroll();
            timeoutScroll -= 10;
            startScroll();
        }else{
            timeoutScroll -= 10;
        }

        if(timeoutScroll - 10 == 0)
            document.getElementById("add_scroll").setAttribute("disabled", "");
    }
}

function decreaseSpeedScroll(){
    if(timeoutScroll != 100){
        if(document.getElementById("add_scroll").disabled)
            document.getElementById("add_scroll").removeAttribute("disabled");
        if(scrollStarted){
            stopScroll();
            timeoutScroll += 10;
            startScroll();
        }else{
            timeoutScroll += 10;
        }

        if(timeoutScroll + 10 == 110)
            document.getElementById("sub_scroll").setAttribute("disabled", "");
    }
}

function convertChordNotation(chord){
    for(let i = 0; i < 7; ++i){
        if(englishNotation){
            if(chord.includes(englishNote[i])){
                chord = chord.replace(englishNote[i], latinNote[i]);
                break;
            }
        }else{
            if(chord.includes(latinNote[i])){
                chord = chord.replace(latinNote[i], englishNote[i]);
                break;
            }
        }
    }
    return chord;
}


function changeNotation(){
    for(let i = 0; i < numberOfChords; ++i){
        if(chordInSong[i].textContent.includes("/")){ //Se è uno slash chord splitta 
            var chordSplitted = chordInSong[i].textContent.split("/", 2); //array contente 2 note
            chordSplitted[0] = convertChordNotation(chordSplitted[0]);
            chordSplitted[1] = convertChordNotation(chordSplitted[1]);
            chordInSong[i].textContent = chordSplitted[0] + "/" + chordSplitted[1];
        }else{
            chordInSong[i].textContent = convertChordNotation(chordInSong[i].textContent);
        }
    }
    englishNotation = !englishNotation;
}

//Trasposizione tonale (cambio tonalità)


function transposeUp(){
    kTransp++;
    //kTransp [0, 12)
    if(kTransp >= 12)
        kTransp = 0;
    else if (kTransp < 0)
        kTransp = 11;
    transpose();
}

function transposeDown(){
    kTransp--;
    if(kTransp > 12)
        kTransp = 1;
    else if (kTransp < 0)
        kTransp = 11;
    transpose();
}

function resetKey(){
    kTransp = 0;
    transpose();    
}

function transposeKey(chord){
    for(let i = 0; i < 12; ++i){
        if(englishNotation){
            if(chord.includes(englishNoteChromatic[i])){
                if(chord.includes("#")){
                    chord = chord.replace(englishNoteChromatic[i + 1], englishNoteChromatic[((i + 1) + kTransp) % 12]);
                    break;
                }else{
                    chord = chord.replace(englishNoteChromatic[i], englishNoteChromatic[(i + kTransp) % 12]);
                    break;
                }
            }
        }else{
            if(chord.includes(latinNoteChromatic[i])){
                if(chord.includes("#")){
                    chord = chord.replace(latinNoteChromatic[i + 1], latinNoteChromatic[((i + 1) + kTransp) % 12]);
                    break;
                }else{
                    chord = chord.replace(latinNoteChromatic[i], latinNoteChromatic[(i + kTransp) % 12]);
                    break;
                }
            }
        }
    }
    return chord;
}

function transpose(){

    for(let i = 0; i < numberOfChords; ++i){
        if(chordInSong[i].textContent.includes("/")){ //Se è uno slash chord splitta 
            let chordSplitted = englishNotation ? OriginalChordEng[i].split("/", 2) : OriginalChordLat[i].split("/", 2); //array contenente 2 note
            chordSplitted[0] = transposeKey(chordSplitted[0]);
            chordSplitted[1] = transposeKey(chordSplitted[1]);
            chordInSong[i].textContent = chordSplitted[0] + "/" + chordSplitted[1];
            
        }else{
            chordInSong[i].textContent = englishNotation ? transposeKey(OriginalChordEng[i]) : transposeKey(OriginalChordLat[i]);
        }
    }
}
