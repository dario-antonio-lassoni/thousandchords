//Mostra accordo al click 
var divContent = document.getElementById("main_content");
var chordInSong = divContent.getElementsByClassName("chord");
var numberOfChords = divContent.getElementsByClassName("chord").length;

var divShowChord = document.createElement("div");
divShowChord.setAttribute("id", "show_chord");

//Non uso let ma var perchè dopo cancellazione di showChord non mi permette di ricreare le variabili

var imgChord = document.createElement("img");
imgChord.className = "img_chord";
imgChord.setAttribute("alt", "");
imgChord.setAttribute("src", "/");
divShowChord.appendChild(imgChord);

var leftArrow = document.createElement("img");
leftArrow.setAttribute("alt", "<");
leftArrow.setAttribute("src", "../img/left-arrow.png");
leftArrow.setAttribute("class", "imgBtnShowChord");

var rightArrow = document.createElement("img");
rightArrow.setAttribute("alt", ">");
rightArrow.setAttribute("src", "../img/right-arrow.png");
rightArrow.setAttribute("class", "imgBtnShowChord");

var close = document.createElement("img");
close.setAttribute("alt", "X");
close.setAttribute("src", "../img/close.png");
close.setAttribute("class", "imgBtnShowChord");

var backward = document.createElement("button");
backward.appendChild(leftArrow);
backward.setAttribute("name", "bwd_chord");
backward.setAttribute("disabled", "");
backward.setAttribute("onclick", "chordVariation(false)"); //se true allora va avanti altrimenti indietro
backward.setAttribute("class", "btn showchord");

var forward = document.createElement("button");
forward.appendChild(rightArrow);
forward.setAttribute("name", "fwd_chord");
forward.setAttribute("onclick", "chordVariation(true)"); //se true allora va avanti altrimenti indietro
forward.setAttribute("class", "btn showchord");

var closeChordBtn = document.createElement("button");
closeChordBtn.appendChild(close);
closeChordBtn.setAttribute("class", "btn showchord");
closeChordBtn.setAttribute("onclick", "closeChord()");

divShowChord.appendChild(backward);
divShowChord.appendChild(forward);
divShowChord.appendChild(closeChordBtn);

document.body.appendChild(divShowChord);

var actualChordVar = 1; //attuale variazione dell'accordo visualizzata
var actualChord; //array di accordi attuale



//aggiunge ad ogni accordo la chiamata ajax per richiedere le immagini
for(let i = 0; i < numberOfChords; ++i){
    document.getElementsByClassName("chord")[i].addEventListener("click", function(event){
        let thisChord = this.textContent;
        //converte l'accordo in notazione inglese poiché nel DB l'accordo è salvato in notazione inglese
        if(!englishNotation){
            if(thisChord.includes("/")){ //Se è uno slash chord splitta 
                let chordSplitted = thisChord.split("/", 2); //array contente 2 note
                chordSplitted[0] = convertChordNotation(chordSplitted[0]);
                chordSplitted[1] = convertChordNotation(chordSplitted[1]);
                thisChord = chordSplitted[0] + "/" + chordSplitted[1];
            }else{
                thisChord = convertChordNotation(thisChord);
            }
        }

        //encodeURIComponent permette di inviare i caratteri speciali non riconosciuti in fase di submit, come '+'
        AjaxReq("POST", "../php/AjaxResponse/showChord.php", "chord=" + encodeURIComponent(thisChord), 
            function(arr){
                //reset del div
                actualChordVar = 1;
                document.getElementsByName("fwd_chord")[0].removeAttribute("disabled");
                document.getElementsByName("bwd_chord")[0].setAttribute("disabled", "");

                //posizione del mouse al click
                let x_pos = event.screenX;
                let y_pos = event.screenY;

                actualChord = JSON.parse(arr);  

                setChord();
                divShowChord.style.left = x_pos - 40 + window.pageXOffset +'px';
                divShowChord.style.top = y_pos - 230 + window.pageYOffset + 'px';
                divShowChord.style.display = "inline";
            
            }
        );
    });
}

//Imposta accordo da mostrare
function setChord(){

    if(actualChord != 0){
        imgChord.src = actualChord["imgpath"] + "/";
        
        let chordName = actualChord["name"];
        //sostituisce #, / o + con sharp, slash o plus per problemi di visualizzazione dei link
        if(actualChord["name"].includes("#") || actualChord["name"].includes("/") || actualChord["name"].includes("+")){
            if(chordName.includes("#"))
                chordName = actualChord["name"].replace("#", "sharp");
            if(chordName.includes("/"))
                chordName = chordName.replace("/", "slash");
            if(actualChord["name"].includes("+"))
                chordName = chordName.replace("+", "plus");
        }else{
            chordName = actualChord["name"];    
        }

        imgChord.src += chordName + "_" + actualChordVar + "." + actualChord["imgtype"];
    }else{ 
        //Se accordo non esiste nel DB 
        imgChord.src = "../img/chords/errorChord.png";
    }
}

//Chiudi accordo se si clicca sulla x
function closeChord(){
    document.getElementById("show_chord").style.display = "none";
}

//se forward = true allora va avanti altrimenti indietro
function chordVariation(forward){
    if(forward && (actualChordVar + 1) <= actualChord["numVariations"]){ //cambia alla prossima variazione in avanti
        document.getElementsByName("bwd_chord")[0].removeAttribute("disabled");    
        actualChordVar++;
    }else if(!forward && (actualChordVar - 1) > 0){  
        document.getElementsByName("fwd_chord")[0].removeAttribute("disabled");    
        actualChordVar--;
    }
    
    if(actualChordVar == actualChord["numVariations"])
        document.getElementsByName("fwd_chord")[0].setAttribute("disabled", "");    
    else if(actualChordVar == 1)
        document.getElementsByName("bwd_chord")[0].setAttribute("disabled", "");

    setChord();    
}
