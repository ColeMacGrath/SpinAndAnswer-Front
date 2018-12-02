var button = document.getElementById('button');

var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

button.addEventListener('click', function () {
    var question = document.getElementById('question').value;
    var answer = document.getElementById('correct').value;
    var wrongOne = document.getElementById('wrongOne').value;
    var wrongTwo = document.getElementById('wrongTwo').value;
    var wrongThree = document.getElementById('wrongThree').value;
    var category = document.getElementById('category').selectedIndex + 1;

    fetch('http://localhost:3000/users/token/id', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var userid = await respuesta.json();
        postRequest('http://localhost:3000/questions/', {
            "category": category,
            "question": question,
            "correct_answer": answer,
            "answer_one": wrongOne,
            "answer_two": wrongTwo,
            "answer_three": wrongThree,
            "question_user_id": userid
        }, header).catch(error => alert('Check your data, stupid!'))
    }).catch(error => alert('Invalid Session'))

});