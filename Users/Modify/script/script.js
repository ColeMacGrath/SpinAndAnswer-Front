var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);
var button = document.getElementById('buttonModify');

var buttonLog = document.getElementById('logout');

buttonLog.addEventListener('click', function() {
  setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
  location.href = '../../Main-Page/index.html';
})

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

        if(name == "" || mail === "" || username == "" || password === "" || secondPass == "" || secondMail === "") {
          createAlert('There´s some empty data! Make sure to fill in all the text fields ', 'warning', 6000);
        } else {
        postRequest('https://spinandanswer.herokuapp.com/users/' + userid, {name: name, mail: mail, username: username, password: password, second_mail: secondMail}) .then(function(data) {
          alert('Modfied data');
          location.href = '../Profile/index.html'
        })
            .catch(error => alert('Check your data, stupid!'))
          }
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
