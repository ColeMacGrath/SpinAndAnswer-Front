var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var div = document.getElementById('div');
var ul = document.getElementById('ul');

var categories = { "databases": 1, "programming": 2, "mobile": 3, "sw": 4, "linux": 5, "networking": 6 }

var button = document.getElementById('logout');

button.addEventListener('click', function() {
  setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
  location.href = '../../Main-Page/index.html';
})

function clone(game) {
    for(var i=0; i<game.length; i++) {
        var li = document.createElement('li');
        var gameDiv = document.createElement('div');
        gameDiv.classList.add('box');
        var infoDiv = document.createElement('div');
        infoDiv.classList.add('info')
        var title = document.createElement('h3');
        var gameWinner = document.createElement('p');
        var dateInfo = document.createElement('p');
        li.id = game[i].game_id;
        li.addEventListener('click', showGame);

        switch (game[i].category) {
            case categories.databases:
                title.textContent = 'Databases';
                gameDiv.classList.add('img-2');
                break;
            case categories.programming:
                title.textContent = 'Programming';
                gameDiv.classList.add('img-3');
                break;
            case categories.mobile:
                title.textContent = 'Mobile Development';
                gameDiv.classList.add('img-6');
                break;
            case categories.sw:
                title.textContent = 'Software engineering';
                gameDiv.classList.add('img-4');
                break;
            case categories.linux:
                title.textContent = 'Linux';
                gameDiv.classList.add('img-1');
                break;
            case categories.networking:
                title.textContent = 'Networking';
                gameDiv.classList.add('img-5');
                break;
            default:

        }

        if (game[i].turn >= 10) {
            if (game[i].user_score < game[i].rival_score) {
                gameWinner.textContent = 'Looser';
            } else if (game[i].user_score > game[i].rival_score) {
                gameWinner.textContent = 'Winner';
            } else {
                gameWinner.textContent = 'Draw';
            }
        } else {
            gameWinner.textContent = 'Game still in progress';
        }

        dateInfo.textContent = 'Game Date: ' + formatDate(new Date(game[i].game_date));

        infoDiv.appendChild(title);
        infoDiv.appendChild(dateInfo);
        infoDiv.appendChild(gameWinner);
        gameDiv.appendChild(infoDiv);
        li.appendChild(gameDiv);
        ul.appendChild(li);
        div.appendChild(ul);
    }
}

function showGame(){
  setCookie('nadal', this.id, 168);
  location.href = '../Play/index.html';
}

window.addEventListener('load', function() {
    getGames();
});


function getGames() {
    fetch('https://spinandanswer.herokuapp.com/game/all/myGames', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var games = await respuesta.json();
        clone(games);
    }).catch(function(err) {
        console.error(err);
    });
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
