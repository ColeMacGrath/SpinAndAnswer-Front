var button = document.getElementById('buttonRecover');
var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");

button.addEventListener('click', function () {
    const mail = document.getElementById('mail').value;
    patchRequest('http://localhost:3000/users/reset', {mail: mail}, header)
        .then(data => alert('Check your mail'))
        .catch(error => alert('Check your data, stupid!'))

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