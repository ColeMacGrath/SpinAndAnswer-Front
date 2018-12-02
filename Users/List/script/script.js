var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);
var deleteButton = document.getElementById("deleteButton");
var addButton = document.getElementById("addButton");
var closeButton = document.getElementById("closeButton");
var modal = document.getElementById('modal-wrapper');

deleteButton.addEventListener('click', deleteInList);
addButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);


window.addEventListener('load', function() {
    fetch('http://localhost:3000/questions', {
        method: 'GET',
        headers: header,
    }).then(async function(respuesta) {
        var questions = await respuesta.json();
        clone(questions.data);
    }).catch(function(err) {
        console.error(err);
    });
});


function deleteInList() {
    this.parentElement.style.display='none';
}

function openModal() {
    document.getElementById('modal-wrapper').style.display='none';
}

function closeModal() {
    document.getElementById('modal-wrapper').style.display='block';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}