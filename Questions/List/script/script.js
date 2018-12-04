var cookie = getCookie('session');
var header = new Headers();
header.append("Content-Type", "application/json");
header.append("Authorization", "Bearer " + cookie);
var button = document.getElementsByClassName('boton');
var find = document.getElementById('buttonFind');
var arrayQuestions = [];
var questionInfo = [];

const databases = {
    category: 1,
    imageSource: 'img/database.png'
};

const programming = {
    category: 2,
    imageSource: 'img/programming.png'
};

const mobile = {
    category: 3,
    imageSource: 'img/mobile.png'
};

const sw = {
    category: 4,
    imageSource: 'img/software.png'
};

const linux = {
    cateogry: 5,
    imageSource: 'img/linux.png'
};

const networking = {
    category: 6,
    imageSource: 'img/networking.png'
};


window.addEventListener('load', function() {
    fetch('https://spinandanswer.herokuapp.com/questions', {
        method: 'GET',
        headers: header,
    }).then(async function(respuesta) {
        var questions = await respuesta.json();
        arrayQuestions = questions.data;
        clone(questions.data);
    }).catch(function(err) {
        console.error(err);
    });
});

function clone(questions) {
    const container = document.getElementById('container');
    for(var i=0; i<questions.length; i++) {
        if(questions[i].id.active) {
            var ul = document.createElement('ul');
            ul.classList.add('ul');
            ul.classList.add('card');

            var li = document.createElement('li');
            li.classList.add('bar');

            var button = document.createElement('button');
            button.id = i + 1;
            button.classList.add('bar-item');
            button.classList.add('white');
            button.classList.add('right');
            button.textContent = 'x';
            button.addEventListener('click', deleteQuestion);

            var image = document.createElement('img');
            image.id = i + 1;
            image.classList.add('bar-item');
            image.style.width='120px';
            switch(questions[i].id.category) {
                case programming.category:
                    image.src = programming.imageSource;
                    break;
                case linux.cateogry:
                    image.src = linux.imageSource;
                    break;
                case networking.category:
                    image.src = networking.imageSource;
                    break;
                case databases.category:
                    image.src = databases.imageSource;
                    break;
                case mobile.category:
                    image.src = mobile.imageSource;
                    break;
                case sw.category:
                    image.src = sw.imageSource;
                    break;
            }
            image.addEventListener('click', modifyQuestion);

            var div = document.createElement('div');
            div.classList.add('bar-item');

            var questionSpan = document.createElement('span');
            questionSpan.textContent = questions[i].id.question;

            div.appendChild(questionSpan);
            li.appendChild(button);
            li.appendChild(image);
            li.appendChild(div);
            ul.appendChild(li);
            container.appendChild(ul);
        }
        else {
            const container = document.getElementById('containertwo');

            var ul = document.createElement('ul');
            ul.classList.add('ul');
            ul.classList.add('card');

            var li = document.createElement('li');
            li.classList.add('bar');

            var button = document.createElement('button');
            button.id = i + 1;
            button.classList.add('bar-item');
            button.classList.add('white');
            button.classList.add('right');
            button.textContent = '+';
            button.addEventListener('click', deleteQuestion);

            var image = document.createElement('img');
            image.classList.add('bar-item');
            image.style.width='120px';
            switch(questions[i].id.category) {
                case programming.category:
                    image.src = programming.imageSource;
                    break;
                case linux.cateogry:
                    image.src = linux.imageSource;
                    break;
                case networking.category:
                    image.src = networking.imageSource;
                    break;
                case databases.category:
                    image.src = databases.imageSource;
                    break;
                case mobile.category:
                    image.src = mobile.imageSource;
                    break;
                case sw.category:
                    image.src = sw.imageSource;
                    break;
            }

            var div = document.createElement('div');
            div.classList.add('bar-item');

            var questionSpan = document.createElement('span');
            questionSpan.textContent = questions[i].id.question;

            div.appendChild(questionSpan);
            li.appendChild(button);
            li.appendChild(image);
            li.appendChild(div);
            ul.appendChild(li);
            container.appendChild(ul);
        }
    }
}

function deleteQuestion() {
    var questionId = this.id;
    fetch('https://spinandanswer.herokuapp.com/questions/' + questionId, {
        method: 'PATCH',
        headers: header,
    }).then(function(respuesta) {
        location.reload();
    }).catch(function(err) {
        console.error(err);
    });
}

function modifyQuestion() {
    var questionId = this.id;
    console.log(questionId);
    setCookie('number', questionId, 168);
    location.href="../../Questions/Modify/index.html";
}

find.addEventListener('click', function() {
  var text = document.getElementById('textSearch').value;
  var index = 0;
  var array = [];
  var j = 0;

  console.log(arrayQuestions);
  for(var i=0; i<arrayQuestions.length; i++) {
    index = arrayQuestions[i].id.question.indexOf(text);

    if (index >= 0){
      array[j] = arrayQuestions[i];
      j++
    }
  }
/*  location.reload();
  clone(array); */
  document.getElementById("container").innerHTML="";
  document.getElementById("containertwo").innerHTML="";
  clone(array);
  console.log(array);
})
