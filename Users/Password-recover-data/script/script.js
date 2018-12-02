var button = document.getElementById('buttonPass');

var header = new Headers();
header.append("Content-Type", "application/json");

button.addEventListener('click', function () {
    var password = document.getElementById('password').value;
     patchRequest('http://localhost:3000/users/reset/$2a$10$0U97TFGTM7lXrgjCV1mabu2qmirEJXrlI4pWPGp9IW.xxSaHiH9ri', {password: password}, header)
        .then(data => alert('Check your mail')) // Result from the `response.json()` call
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