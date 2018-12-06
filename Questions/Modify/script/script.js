var cookie = getCookie('session');
var questionId = getCookie('number');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);
var button = document.getElementById('button');

var buttonLog = document.getElementById('logout');

buttonLog.addEventListener('click', function() {
  setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
  location.href = '../../Main-Page/index.html';
})

window.addEventListener('load', function() {
  fetch('https://spinandanswer.herokuapp.com/questions/' + questionId, {
        method: 'GET',
        headers: header,
    }).then(async function(respuesta) {
      var questionInfo = await respuesta.json();

      document.getElementById('question').value = questionInfo.id[0].question;
      document.getElementById('correct').value = questionInfo.id[0].correct_answer;
      document.getElementById('wrongOne').value = questionInfo.id[0].answer_one;
      document.getElementById('wrongTwo').value = questionInfo.id[0].answer_two;
      document.getElementById('wrongThree').value = questionInfo.id[0].answer_three;
      document.getElementById('category').selectedIndex = questionInfo.id[0].category - 1;

    }).catch(function(err) {
        console.error(err);
    });
});

button.addEventListener("click", function() {
  var question = document.getElementById('question').value;
  var correct = document.getElementById('correct').value;
  var wrongOne = document.getElementById('wrongOne').value;
  var wrongTwo = document.getElementById('wrongTwo').value;
  var wrongThree = document.getElementById('wrongThree').value;
  var category = document.getElementById('category').selectedIndex + 1;

  putRequest('https://spinandanswer.herokuapp.com/questions/' + questionId, {
    category: category,
    question: question,
    correct_answer: correct,
    answer_one: wrongOne,
    answer_two: wrongTwo,
    answer_three: wrongThree
  }).then(function(data) {
    alert('Data modified');
    location.href= '../List/index.html';
  })
    .catch(error => alert('Check your data, stupid!'))
});

function putRequest(url, data) {
    console.log(data);
    return fetch(url, {
        credentials: 'same-origin',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: header,
    })
        .then(response => response.json())
}
