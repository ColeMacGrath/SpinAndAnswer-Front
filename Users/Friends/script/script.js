var deleteButton = document.getElementById("deleteButton");
var addButton = document.getElementById("addButton");
var closeButton = document.getElementById("closeButton");
var modal = document.getElementById('modal-wrapper');

deleteButton.addEventListener('click', deleteInList);
addButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);


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