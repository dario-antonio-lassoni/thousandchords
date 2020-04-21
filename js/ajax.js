function AjaxReq(method, url, dataToSend, responseFunc){ //responseFunc: funzione callback
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, url, true); //Async di default
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xmlHttp.onreadystatechange = useHttpResponse; 
    xmlHttp.send(dataToSend); //da lasciare vuoto se GET
    function useHttpResponse(){
        if(xmlHttp.readyState == 4){
            var data = xmlHttp.responseText;
			responseFunc(data);
        }
    }
}