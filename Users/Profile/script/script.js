const usernameLabel = document.getElementById('username');
const nameLabel = document.getElementById('nombre');
const emailLabel = document.getElementById('email');
const secondMailLabell = document.getElementById('second_mail');

var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var buttonLog = document.getElementById('logout');

buttonLog.addEventListener('click', function() {
  setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
  location.href = '../../Main-Page/index.html';
})

window.addEventListener('load', function() {
    fetch('https://spinandanswer.herokuapp.com/users/token/id', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var userid = await respuesta.json();
        fetch('https://spinandanswer.herokuapp.com/users/' + userid, {
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
    }).catch(function(err) {
        console.error(err);
    });
});
