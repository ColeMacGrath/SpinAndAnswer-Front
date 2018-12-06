var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);

var find = document.getElementById('buttonFind');
var arrayFriends = [];

var request = document.getElementById('request');
var friends = document.getElementById('friends');

request.addEventListener('click', filterRequest);
friends.addEventListener('click', filterFriends);

window.addEventListener('load', function() {
    filterFriends();
});

function clone(friends) {
    const container = document.getElementById('container');
    for(var i=0; i<friends.length; i++) {
        if (friends[i].id[0].active) {
            var ul = document.createElement('ul');
            ul.classList.add('ul');
            ul.classList.add('card');

            var li = document.createElement('li');
            li.classList.add('bar');

            var button = document.createElement('button');
            button.id = friends[i].id[0].user_id;
            button.classList.add('bar-item');
            button.classList.add('white');
            button.classList.add('right');
            button.textContent = 'x';
            button.addEventListener('click', deleteFriend);


            var image = document.createElement('img');
            image.classList.add('bar-item');
            image.style.width='120px';
            image.src = 'img/male-avatar.png'

            var div = document.createElement('div');
            div.classList.add('bar-item');

            var friendsSpan = document.createElement('span');
            friendsSpan.textContent = friends[i].id[0].mail + ': ' + friends[i].id[0].name;

            div.appendChild(friendsSpan);
            li.appendChild(button);
            li.appendChild(image);
            li.appendChild(div);
            ul.appendChild(li);
            container.appendChild(ul);
        }

    }
}

function deleteFriend() {
    var friendId = this.id;
    fetch('https://spinandanswer.herokuapp.com/users/token/id', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var userID = await respuesta.json();
        var url = 'https://spinandanswer.herokuapp.com/users/' + userID + '/friends/';
        deleteRequest(url, { "friendId": friendId });
    }).catch(function(err) {
        console.error(err);
    });
}

function deleteRequest(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: header,
    }).then(function(respuesta) {
        location.reload();
    }).catch(function(err) {
        console.error(err);
    });
}

find.addEventListener('click', function() {
    var text = document.getElementById('textSearch').value;
    var index = 0;
    var array = [];
    var j = 0;

    for(var i=0; i<arrayFriends.length; i++) {
        index = arrayFriends[i].id[i].name.indexOf(text);
        if (index >= 0){
            array[j] = arrayFriends[i];
            j++
        }
    }
    document.getElementById("container").innerHTML="Search Results";
    clone(array);
});

function filterRequest() {
    fetch('https://spinandanswer.herokuapp.com/users/token/id', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var userid = await respuesta.json();
        fetch('https://spinandanswer.herokuapp.com/users/' + userid + '/friendshipRequest', {
            method: 'get',
            headers: header,
        }).then(async function(respuesta) {
            var friends = await respuesta.json();
            arrayFriends = friends;
            document.getElementById("container").textContent = "Request";
            clone(friends);
        }).catch(function(err) {
            console.error(err);
        });
    }).catch(function(err) {
        console.error(err);
    });
}

function filterFriends() {
    fetch('https://spinandanswer.herokuapp.com/users/token/id', {
        method: 'get',
        headers: header,
    }).then(async function(respuesta) {
        var userid = await respuesta.json();
        fetch('https://spinandanswer.herokuapp.com/users/' + userid + '/friends', {
            method: 'get',
            headers: header,
        }).then(async function(respuesta) {
            var friends = await respuesta.json();
            arrayFriends = friends.data;
            document.getElementById("container").innerHTML="My Friends";
            clone(friends.data);
        }).catch(function(err) {
            console.error(err);
        });
    }).catch(function(err) {
        console.error(err);
    });
}
