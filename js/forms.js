//Form di ricerca
var searchForm = document.createElement("form");
searchForm.setAttribute("method", "GET");
searchForm.setAttribute("id", "search_form");
searchForm.setAttribute("action", "../php/search.php");

var inputSearch = document.createElement("input");
inputSearch.setAttribute("type", "text");
inputSearch.setAttribute("name", "input_search");
inputSearch.setAttribute("placeholder", "Cerca...");
inputSearch.setAttribute("required", "");

var page = document.createElement("input");
page.setAttribute("type", "hidden");
page.setAttribute("name", "page");
page.setAttribute("value", "1"); //Setta la prima pagina del resultset ricerca 

var btnSearch = document.createElement("input");
btnSearch.setAttribute("type", "submit");
btnSearch.setAttribute("id", "btn_search");
btnSearch.setAttribute("value", " ");

searchForm.appendChild(inputSearch);
searchForm.appendChild(btnSearch);
searchForm.appendChild(page);
document.getElementsByClassName("header")[0].appendChild(searchForm);

//Form di registrazione
var divRegForm = document.createElement("div");
divRegForm.setAttribute("id", "id_reg_form");
divRegForm.setAttribute("class", "overlay_form");
var regForm = document.createElement("form");
regForm.setAttribute("id", "reg_form");
regForm.setAttribute("method", "POST");
regForm.setAttribute("action", "../php/register.php");
var input_reg_username = document.createElement("input");
input_reg_username.setAttribute("type", "text");
input_reg_username.setAttribute("name", "reg_username");
var input_reg_password = document.createElement("input");
input_reg_password.setAttribute("type", "password");
input_reg_password.setAttribute("name", "reg_password");
var input_reg_password_rep = document.createElement("input");
input_reg_password_rep.setAttribute("type", "password");
input_reg_password_rep.setAttribute("name", "reg_password");
var input_reg_email = document.createElement("input");
input_reg_email.setAttribute("type", "text");
input_reg_email.setAttribute("name", "reg_email");
var input_reg_email_rep = document.createElement("input");
input_reg_email_rep.setAttribute("type", "text");
input_reg_email_rep.setAttribute("name", "reg_email");

var btn_reg_submit = document.createElement("input");
btn_reg_submit.setAttribute("type", "button");
btn_reg_submit.setAttribute("class", "btn");
btn_reg_submit.setAttribute("onclick", "checkRegForm()");
btn_reg_submit.setAttribute("value", "Registrati");

var h1_reg = document.createElement("h1");
var textReg = document.createTextNode("Registrazione");
h1_reg.appendChild(textReg);
regForm.appendChild(h1_reg);

regForm.appendChild(document.createTextNode("Username"));
regForm.appendChild(input_reg_username);
regForm.appendChild(document.createTextNode("Password"));
regForm.appendChild(input_reg_password);
regForm.appendChild(document.createTextNode("Conferma Password"));
regForm.appendChild(input_reg_password_rep);
regForm.appendChild(document.createTextNode("Email"));
regForm.appendChild(input_reg_email);
regForm.appendChild(document.createTextNode("Conferma Email"));
regForm.appendChild(input_reg_email_rep);
regForm.appendChild(btn_reg_submit);
divRegForm.appendChild(regForm);
document.body.appendChild(divRegForm);

//Form di login

var divLoginForm = document.createElement("div");
divLoginForm.setAttribute("id", "id_login_form");
divLoginForm.setAttribute("class", "overlay_form");
var loginForm = document.createElement("form");
loginForm.setAttribute("id", "login_form");
loginForm.setAttribute("method", "POST");
loginForm.setAttribute("action", "../php/login.php");
var logo = document.createElement("div");
logo.setAttribute("id", "logo");
var input_login_username = document.createElement("input");
input_login_username.setAttribute("type", "text");
input_login_username.setAttribute("name", "username");
var input_login_password = document.createElement("input");
input_login_password.setAttribute("type", "password");
input_login_password.setAttribute("name", "password");
var btn_login_submit = document.createElement("input");
btn_login_submit.setAttribute("type", "button");
btn_login_submit.setAttribute("class", "btn");
btn_login_submit.setAttribute("onclick", "checkLogForm()");
btn_login_submit.setAttribute("value", "Login");

var h1_log = document.createElement("h1");
var textReg = document.createTextNode("Login");
h1_log.appendChild(textReg);
loginForm.appendChild(h1_log);

loginForm.appendChild(document.createTextNode("Username"));
loginForm.appendChild(input_login_username);
loginForm.appendChild(document.createTextNode("Password"));
loginForm.appendChild(input_login_password);
loginForm.appendChild(btn_login_submit);
divLoginForm.appendChild(loginForm);
document.body.appendChild(divLoginForm);

//variabili form
var loginForm = document.getElementById('id_login_form');
var regForm = document.getElementById('id_reg_form'); 
var loginUsername = document.getElementsByName('username')[0];
var loginPassword = document.getElementsByName('password')[0];
var regUsername = document.getElementsByName('reg_username')[0];
var regPassword = document.getElementsByName('reg_password')[0];
var regPasswordRep = document.getElementsByName('reg_password')[1];
var regEmail = document.getElementsByName('reg_email')[0];
var regEmailRep = document.getElementsByName('reg_email')[1];

function openLoginForm(){
    loginForm.style.display='flex';
}

function openRegForm(){
    userExists = -1;
    document.getElementById('id_reg_form').style.display='flex';
}

//Se si clicca fuori dai form allora i form si chiudono
window.onclick = function(event) {
    if (event.target == loginForm || event.target == regForm) {
        //Pulizia campi form di registrazione e login
        regUsername.value = "";
        regPassword.value = "";
        regPasswordRep.value = "";
        document.getElementsByName('reg_email')[0] = "";
        regEmail.value = "";
        regEmailRep.value = "";
        loginUsername.value = "";
        loginPassword.value = "";
        
        loginForm.style.display = "none";
        regForm.style.display = "none";
    }
}

//Controlla che il form sia stato compilato correttamente
function checkRegForm(){
    var allowedCharUsername = /^[a-zA-Z0-9]+$/;
    var allowedCharEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(regUsername.value == '' || regPassword.value == '' || regEmail.value == ''
                               || regPasswordRep.value == '' || regEmailRep.value == ''){
        addNotification("Compila tutti i campi");
        return;
    }else{

        if (allowedCharUsername.test(regUsername.value) == false){
            addNotification("Puoi usare solo caratteri alfanumerici per l'username");
            return;
        }

        if(regPassword.value != regPasswordRep.value && regEmail.value != regEmailRep.value){
            addNotification("Le password non coincidono!");
            addNotification("Le email non coincidono!");
            return;
        }else if (regEmail.value != regEmailRep.value){
            addNotification("Le email non coincidono!");
            return;
        }else if(regPassword.value != regPasswordRep.value){
            addNotification("Le password non coincidono!");
            return;
        }    
    
        if (allowedCharEmail.test(regEmail.value) == false && regEmail.value != ""){
            addNotification("Email errata!");
            return;
        }
         
    }

    submitRegForm();

}

//Prima di inviare il form, controlla che l'utente non esista
function submitRegForm(){
    //Se il form è stato compilato e l'utente non esiste fa il submit del form
    AjaxReq("POST", "../php/AjaxResponse/checkIfUserExists.php", "username=" + regUsername.value, function(exists){
        if(exists == 0){
            document.getElementById('reg_form').submit();
        }else{
            addNotification(regUsername.value + " e' già registrato");
        }
    });
}

//Controlla che il form sia stato compilato correttamente
function checkLogForm(){
    if(loginUsername.value == '' || loginPassword.value == ''){
        addNotification("Compila tutti i campi");
        return;
    }else{
        submitLogForm();
    }
}

//Controlla che l'utente esista durante il login
function submitLogForm(){
    AjaxReq("POST", "../php/AjaxResponse/checkIfUserExists.php", "username=" + loginUsername.value, function(exists){
        if(exists == 1){
            document.getElementById('login_form').submit();
        }else{
            addNotification(loginUsername.value + " non e' registrato");
        }
    });
}