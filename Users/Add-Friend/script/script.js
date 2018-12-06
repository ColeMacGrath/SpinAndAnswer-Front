var button = document.getElementById('buttonRecover');
var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var buttonLog = document.getElementById('logout');
var regex = /^.[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

buttonLog.addEventListener('click', function() {
    setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
    location.href = '../../Main-Page/index.html';
})

button.addEventListener('click', function () {
    var mail = document.getElementById('mail').value;

    if(mail == "") {
        createAlert('There´s some empty data! Make sure to fill in all the text fields ', 'warning', 6000);
    } else if (!regex.test(mail)){
        createAlert('Invalid mail! Please insert a correct mail account', 'warning', 6000);
    } else {
        postRequest('https://spinandanswer.herokuapp.com/users/getUserId', {mail: mail})
            .then(function(data) {
            var friendId = data.id[0].user_id;
            fetch('https://spinandanswer.herokuapp.com/users/token/id', {
                method: 'get',
                headers: header,
            }).then(async function(respuesta) {
                var userid = await respuesta.json();
                postRequest('https://spinandanswer.herokuapp.com/users/' + userid + '/friends', {friendId: friendId})
                    .then(function() {
                    alert('Request sent');
                    location.href = '../Friends/index.html';
                })
                    .catch(error => alert('Request already sent'))
            }).catch(function(err) {
                console.error(err);
            });
        })
            .catch(error => alert('User not found'))
    }

});

function postRequest(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: header,
    })
        .then(response => response.json())
}
