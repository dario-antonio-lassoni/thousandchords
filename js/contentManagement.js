//FUNZIONI PER LA GESTIONE DEI CONTENUTI---------------------------------------------------------------------------------------------------------

//Inserisci accordo
function insertChord(){
    var chord = prompt("Inserisci accordo (in notazione inglese):");
    var textArea = document.getElementById("input_content");

    //Se accordo esiste lo inserisce
    AjaxReq("POST", "../php/AjaxResponse/showChord.php", "chord=" + encodeURIComponent(chord), function(arr){
        if(arr != 0){
            let objChord = JSON.parse(arr);          
            insertAtCursor(textArea, "<span class=\"chord\">" + objChord["name"] + "</span>");
            addNotification("Accordo inserito!");
        }else{
            if(confirm("L'accordo non è stato trovato nel nostro database, inserirlo comunque?")){
                insertAtCursor(textArea, "<span class=\"chord\">" + chord + "</span>");
            }
        }
    });

}

// Codice di terze parti------------------------------------------------------ CAPIRE E SPIEGARE--------
function insertAtCursor(myField, myValue) {
    //Mozilla e altri
    if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}

function updatePreview(){
    let divPreview = document.getElementById("content");
    let input_content = document.getElementById("input_content").value;

    //Aggiorna il div preview
    divPreview.innerHTML= "<pre>" + input_content + "</pre>"; //In questo caso non ho trovato alternativa ad innerHTML
    
    //Distruggi divShowChord se esiste
    if(document.getElementById("show_chord"))
        divShowChord.remove();

    //Rimuovo e riaggiungo gli script per aggiornare le variabili
    removeJS("showChord.js");
    removeJS("variables.js");
    loadJS("showChord.js");
    loadJS("variables.js");
}

function deleteContent(){
    let select_content = document.getElementById("idContent");
    let value = select_content.options[select_content.selectedIndex].value;
    
    AjaxReq("POST", "../php/AjaxResponse/deleteContent.php", "idContent=" + value, function(deleted){
        if(deleted){
            //Ricarica la pagina per aggiornare i content del select
            window.location="../php/contentManagement.php";
        }else{
            addNotification("Errore durante l'eliminazione del contenuto");
        }
    });

}

//modalità modifica contenuto
var editContentTrigger = false;

function enableEditContent(){
    let select_content = document.getElementById("idContent");
    let idContent = select_content.options[select_content.selectedIndex].value;

    //Recupera i dati del contenuto dal db
    AjaxReq("POST", "../php/AjaxResponse/retrieveContent.php", "idContent=" + idContent, function(arr){
        if(arr != 0){
            editContentTrigger = true;
            document.getElementById("btn_modify").value = "Annulla modifiche";
            document.getElementById("btn_upload").value = "Carica modifiche";
            document.getElementById("btn_delete").style.display = "none";
        
            addNotification("Modalità modifica contenuto attivata");

            //Copia i dati nel form
            arr = JSON.parse(arr);
            document.getElementsByName("title")[0].value = arr["title"];
            document.getElementsByName("album")[0].value = arr["album"];
            document.getElementsByName("artist")[0].value = arr["artist"];
            document.getElementsByName("genre")[0].value = arr["genre"];
            document.getElementById("input_content").value = arr["content"];

            updatePreview();

            //Annulla modifiche: ricarica la pagina contentManagement.php
            document.getElementById("btn_modify").setAttribute("onclick","window.location='../php/contentManagement.php'");

        }else{
            //Caso di errore nel DB
            addNotification("Errore caricamento contenuto");
        }
    });
    


}

function uploadContent(){
    
    let title = document.getElementsByName("title")[0].value;
    let album = document.getElementsByName("album")[0].value;
    let artist = document.getElementsByName("artist")[0].value;
    let genre = document.getElementsByName("genre")[0].value;
    let content = document.getElementsByName("content")[0].value;

    if(title != "" && artist != "" && content != ""){
        if(title.length <= 30 && album.length <= 30 && artist.length <= 30){    
            if(!editContentTrigger){
                //Aggiungi nuovo contenuto
                AjaxReq("POST", "../php/AjaxResponse/addContent.php", 
                    //encodeURIComponent permette di inviare i caratteri speciali non riconosciuti in fase di submit, come '+'
                    "title=" + encodeURIComponent(title) + "&album=" + encodeURIComponent(album) + "&artist=" + encodeURIComponent(artist) + "&genre=" + genre + "&content=" + encodeURIComponent(content), 
                    function(result){
                        if(result != 0){
                            window.location="../php/contentManagement.php";
                        }else{
                            addNotification("Errore durante il caricamento del contenuto");
                        }
                    });
            }else{
                
                let select_content = document.getElementById("idContent");
                let idContent = select_content.options[select_content.selectedIndex].value;
                //Aggiorna contenuto
                AjaxReq("POST", "../php/AjaxResponse/editContent.php", 
                    "title=" + encodeURIComponent(title) + "&album=" + encodeURIComponent(album) + "&artist=" + encodeURIComponent(artist) + "&genre=" + genre + "&content=" + encodeURIComponent(content) + "&idContent=" + idContent, 
                    function(result){
                        if(result != 0){
                            window.location="../php/contentManagement.php";
                        }else{
                            addNotification("Errore durante il caricamento del contenuto");
                        }
                        
                    });
            }
        }else{
            addNotification("Limite di caratteri superato!");
        }
    }else{
        addNotification("Compila tutti i campi obbligatori!");
    }
}