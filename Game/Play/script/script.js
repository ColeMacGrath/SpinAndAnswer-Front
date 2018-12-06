var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var questionTitle = document.getElementById("question");
var questionTurn = document.getElementById("questionNumber");
var chronometer = document.getElementById("number");

var first = document.getElementById("1");
var second = document.getElementById("2");
var thrid = document.getElementById("3");
var fourth = document.getElementById("4");
var gameId = getCookie('nadal');
var turn = 1;
var actualQuestion = 1;

var fisrtGrid = document.getElementById('One');
var secondGrid = document.getElementById('Two');
var thirdGrid = document.getElementById('Three');
var fourthGrid = document.getElementById('Four');

fisrtGrid.addEventListener('click', function () {
    var answer = document.getElementById("1").textContent;
    createAlert('Correct Answer', 'success', 2000);
    postRequest('https://spinandanswer.herokuapp.com/game/' + gameId, {gameId: gameId, questionId: actualQuestion, answer: answer});
    getTurn();
    getQuestions();
})

secondGrid.addEventListener('click', function () {
    var answer = document.getElementById("2").textContent;
    createAlert('Wrong Answer', 'danger', 2000);
    postRequest('https://spinandanswer.herokuapp.com/game/' + gameId, {gameId: gameId, questionId: actualQuestion, answer: answer});
    getTurn();
    getQuestions();
})

thirdGrid.addEventListener('click', function () {
    var answer = document.getElementById("3").textContent;
    createAlert('Wrong Answer', 'danger', 2000);
    postRequest('https://spinandanswer.herokuapp.com/game/' + gameId, {gameId: gameId, questionId: actualQuestion, answer: answer});
    getTurn();
    getQuestions();
})

fourthGrid.addEventListener('click', function () {
    var answer = document.getElementById("4").textContent;
    createAlert('Wrong Answer', 'danger', 2000);
    postRequest('https://spinandanswer.herokuapp.com/game/' + gameId, {gameId: gameId, questionId: actualQuestion, answer: answer});
    getTurn();
    getQuestions();
})

function getRealTurn(theTurn){
    //turn = theTurn;
}

function getTurn() {
    fetch('https://spinandanswer.herokuapp.com/game/results/' + gameId,{
        method: 'GET',
        headers: header,
    }).then(async function(respuesta){
        var game = await respuesta.json();
        turn++;
        //var newTurn = game[0].turn;
        //getRealTurn(newTurn);
    }).catch(function(err){
        console.error(err);
    })
}

function loadQuestion(questions) {
    var str = 'Question ' + turn + ' of 10';
    questionTurn.textContent = str;
    var questionsToShow = questions;
    questionTitle.textContent = questionsToShow[turn].question;
    actualQuestion = questionsToShow[turn].question_id;

    first.textContent = questionsToShow[turn].correct_answer;

    second.textContent = questionsToShow[turn ].answer_one;

    thrid.textContent = questionsToShow[turn].answer_two;

    fourth.textContent = questionsToShow[turn].answer_three;
}

function getQuestions() {
    fetch('https://spinandanswer.herokuapp.com/game/play/' + gameId,{
        method: 'GET',
        headers: header,
    }).then(async function(respuesta){
        var questions = await respuesta.json();
        loadQuestion(questions);
    }).catch(function(err){
        console.error(err);
    })
}

window.addEventListener('load', function() {
    getTurn();
    getQuestions();
});

function postRequest(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: header,
    })
        .then(response => response.json())
}
