var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);
var randomButton = document.getElementById("random");
var friendsButton = document.getElementById("friends");

randomButton.addEventListener('click', deleteInList);
friendsButton.addEventListener('click', openModal);


window.addEventListener('load', function() {
    fetch('http://localhost:3000/questions', {
        method: 'GET',
        headers: header,
    }).then(async function(respuesta) {
        var questions = await respuesta.json();
        clone(questions.data);
    }).catch(function(err) {
        console.error(err);
    });
});