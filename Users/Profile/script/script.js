const usernameLabel = document.getElementById('username');
const nameLabel = document.getElementById('nombre');
const emailLabel = document.getElementById('email');
const secondMailLabell = document.getElementById('second_mail');

var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);
var userId = getUserIdByToken();
console.log('Token: ' + cookie)


window.addEventListener('load', function() {
    
    fetch('http://localhost:3000/users/' + userId, {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var user = await respuesta.json();
        usernameLabel.textContent = user.id[0].username;
        nameLabel.textContent = user.id[0].name;
        emailLabel.textContent = user.id[0].mail;
        secondMailLabell.textContent = user.id[0].second_mail;
    }).catch(function(err) {
        console.error(err);
    });
});

function getUserIdByToken() {
    var id = -1;
    fetch('http://localhost:3000/users/getIdByToken', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var userid = await respuesta.json();
        id = userId[0].user_id;
    }).catch(function(err) {
        console.error(err);
    });
    return id;
}