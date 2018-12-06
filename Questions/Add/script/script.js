var button = document.getElementById('button');

var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', function() {
    setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
    location.href = '../../Main-Page/index.html';
})

button.addEventListener('click', function () {
    var question = document.getElementById('question').value;
    var answer = document.getElementById('correct').value;
    var wrongOne = document.getElementById('wrongOne').value;
    var wrongTwo = document.getElementById('wrongTwo').value;
    var wrongThree = document.getElementById('wrongThree').value;
    var category = document.getElementById('category').selectedIndex + 1;

    if (question == "" || correct == "" || wrongOne == "" || wrongTwo == "" || wrongThree == "") {
        createAlert('There´s some empty data! Make sure to fill in all the text fields ', 'warning', 6000);
    } else {
        fetch('https://spinandanswer.herokuapp.com/users/token/id', {
            method: 'get',
            headers: header,
        }).then(async function(respuesta) {
            var userid = await respuesta.json();
            postRequest('https://spinandanswer.herokuapp.com/questions/', {
                "category": category,
                "question": question,
                "correct_answer": answer,
                "answer_one": wrongOne,
                "answer_two": wrongTwo,
                "answer_three": wrongThree,
                "question_user_id": userid
            }, header).then(function(data){
                alert('Question Created');
                location.href = '../List/index.html';
            }).catch(error => alert('Check your data, stupid!'))
        }).catch(error => alert('Invalid Session'))
    }
});
