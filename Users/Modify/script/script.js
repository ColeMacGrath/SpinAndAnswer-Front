var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);
var button = document.getElementById('buttonModify');

button.addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var username = document.getElementById('username').value;
    var mail = document.getElementById('mail').value;
    var password = document.getElementById('password').value;
    var secondPass = document.getElementById('sure').value;
    var secondMail = document.getElementById('secondMail').value;

    fetch('https://spinandanswer.herokuapp.com/users/token/id', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var userid = await respuesta.json();
        postRequest('https://spinandanswer.herokuapp.com/users/' + userid, {name: name, mail: mail, username: username, password: password, second_mail: secondMail, admin: 0, active: 1}) .then(data => alert('Modfied data')) 
            .catch(error => alert('Check your data, stupid!'))
    }).catch(function(err) {
        console.error(err);
    });
});


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
            document.getElementById('name').value = user.id[0].name;
            document.getElementById('username').value = user.id[0].username;
            document.getElementById('mail').value = user.id[0].mail;
            document.getElementById('secondMail').value = user.id[0].second_mail;
        }).catch(function(err) {
            console.error(err);
        });
    }).catch(function(err) {
        console.error(err);
    });
});

function postRequest(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: header,
    })
        .then(response => response.json())
}