var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var buttonRandom = document.getElementById("buttonRandom");

var id = 1;
var rand = 2;

window.addEventListener('load', function() {
    fetch('https://spinandanswer.herokuapp.com/users/token/id', {
        method: 'GET',
        headers: header,
    }).then(async function(respuesta) {
        id = await respuesta.json();
    }).catch(function(err) {
        console.error(err);
    });
});


function randomUser(){
    fetch('https://spinandanswer.herokuapp.com/users/randomUser',{
        method: 'GET',
        headers: header,
    }).then(async function(respuesta){
        var users = await respuesta.json();
        rand = Math.floor(Math.random() * users.data.length) + 1;
    }).catch(function(err){
        console.error(err);
    })
}

function createGame(){
    fetch('https://spinandanswer.herokuapp.com/game/choose', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({"userId": id, "rivalId": rand}),
        headers: header,
    })
        .then(async function(response) {
        var game = await response.json();
        setCookie('nadal', game[0], 160);
    })
        .catch(function(err){
        console.error(err);
    })

}

buttonRandom.addEventListener('click', function() {
    randomUser();
    createGame();
})
