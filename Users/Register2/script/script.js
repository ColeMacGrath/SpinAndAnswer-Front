var button = document.getElementById('button');

button.addEventListener('click', function () {
    var name2 = document.getElementById('name').value;
    var mail2 = document.getElementById('mail').value;
    var username2 = document.getElementById('username').value;
    var password2 = document.getElementById('password').value;
    var secondPassword2 = document.getElementById('second-password').value;
    var alternativeMail2 = document.getElementById('alternative-mail').value;
    
    postRequest('http://localhost:3000/users', {name: name2, mail: mail2, username: username2, password: password2, second_mail: alternativeMail2})
        .then(data => setCookie('session', data.token, 168)) // Result from the `response.json()` call
        .catch(error => alert('Check your data, stupid!'))

});

function setCookie(cookieName, cookieValue, cookieExdays) {
    var d = new Date();
    d.setTime(d.getTime() + (cookieExdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username=getCookie("username");
    if (username!="") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}


/*Fetch para requests con metodo post
botonDos.addEventListener('click', function () {
    var email = document.getElementById('mail').value;
    var pass = document.getElementById('password').value;
    postRequest('http://localhost:3000/login', {mail: email, password: pass})
        .then(data => setCookie('session', data.token, 168)) // Result from the `response.json()` call
        .catch(error => console.error(error))

}) */

function postRequest(url, data) {
    console.log(data);
    return fetch(url, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    })
        .then(response => response.json())
}
