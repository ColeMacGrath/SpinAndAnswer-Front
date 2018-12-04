const botonDos = document.getElementById('botonPost');

function setCookie(cookieName, cookieValue, cookieExdays) {
    var d = new Date();
    d.setTime(d.getTime() + (cookieExdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    location.href="../Users/Main-Page/userPage.html";
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


/*Fetch para requests con metodo post*/
botonDos.addEventListener('click', function () {
    var email = document.getElementById('mail').value;
    var pass = document.getElementById('password').value;
    var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(email == "" || pass === "") {
      createAlert('There´s some empty data! Make sure to fill in all the text fields ', 'warning', 6000);
    } else if (!regex.test(email)){
        createAlert('Invalid mail! Please insert a correct mail account', 'warning', 6000);
    } else {
      postRequest('https://spinandanswer.herokuapp.com/login', {mail: email, password: pass})
      .then(data => setCookie('session', data.token, 168))
      .catch(error => console.error(error))
    }
})

function postRequest(url, data) {
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
