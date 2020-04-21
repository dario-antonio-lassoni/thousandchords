//cambia le immagini delle stelle quando l'utente sta per votare
for(let i = 0; i < 5; ++i){
    let star = document.getElementsByClassName("starRating");
    star[i].addEventListener("mouseover", function(event){
        for(let j = 0; j <= i; ++j){ // <= per "triggerare" la prima stella
            star[j].className = "starRating";
        }
    });
    star[i].addEventListener("mouseout", function(event){
        for(let j = 0; j <= i; ++j){
            star[j].className = "starRating out";
        }
    });
}