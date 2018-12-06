var button = document.getElementById('buttonRecover');
var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
var regex = /^.[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


button.addEventListener('click', function () {
    const mail = document.getElementById('mail').value;
    if(mail == "") {
        createAlert('There´s some empty data! Make sure to fill in all the text fields ', 'warning', 6000);
    } else if (!regex.test(mail)){
        createAlert('Invalid mail! Please insert a correct mail account', 'warning', 6000);
    } else {
        patchRequest('https://spinandanswer.herokuapp.com/users/reset', {mail: mail}, header)
            .then(data => alert('Check your mail'))
            .catch(error => alert('Check your data, stupid!'))
    }
});

function patchRequest(url, data, header) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: header,
    })
        .then(response => console.log(response))
        .catch(function(err) {
        console.log(err);
    });
}
