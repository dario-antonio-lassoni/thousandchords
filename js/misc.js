function addNotification(str){
    var bar = document.getElementById("notification_bar");    
    bar.style.display = "inline";

    //Controlla che il messaggio che si vuole notificare non sia già visualizzato
    for (let notify = bar.firstChild; notify; notify = notify.nextSibling) {
        if (notify.textContent == str) {
            return;
        }
    }

    var entry = document.createElement('p');
    var message = document.createTextNode(str);

    entry.appendChild(message);

    bar.appendChild(entry);

    //Notifica resta visibile per 10 secondi, dopodichè viene eliminata
    setTimeout(function(){
        message.parentElement.remove("message");
        //Se non ci sono più notifiche da visualizzare, nascondi notification bar    
        if(bar.childElementCount == 0)
            bar.style.display = "none";
    }, 10000);
}

//Funzione che rimuove uno script
function removeJS(filename){
    let tags = document.getElementsByTagName("script");
    for (let i = tags.length; i >= 0; i--){ //Per ogni script caricato nella pagina
     //Se filename corrisponde a quello dello script
     if (tags[i] && tags[i].getAttribute('src') != null && tags[i].getAttribute('src').indexOf(filename) != -1) //indexOf ritorna -1 se non trova il filename
      tags[i].parentNode.removeChild(tags[i]); //Rimuove lo script
    }
}

//Funzione che carica uno script
function loadJS(filename){
    let path = "../js/";
    let script = document.createElement("script");
    script.src = path + filename;
    document.head.appendChild(script);
}
