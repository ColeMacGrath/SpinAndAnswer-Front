var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var buttonRandom = document.getElementById("buttonRandom");

var id = 0;
var rand = 0;

window.addEventListener('load', function() {
    fetch('http://localhost:3000/users/token/id', {
        method: 'GET',
        headers: header,
    }).then(async function(respuesta) {
        id = await respuesta.json();
    }).catch(function(err) {
        console.error(err);
    });
});


function randomUser(){
    fetch('http://localhost:3000/users/randomUser',{
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
    fetch('http://localhost:3000/game/choose', {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify({"userId": id, "rivalId": rand}), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
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

    /* fetch('http://localhost:3000/users/randomUser', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var users = await respuesta.json();
        rand = Math.floor(Math.random() * users.data.length);
    }).then(function(respuesta) {
        fetch('http://localhost:3000/game/choose', {
            method: 'POST',
            headers: header,
            body: JSON.stringify({ "userId": id, "rivalId": rand})
        })
    }).catch(function(err) {
        console.error(err);
    }); */
})
