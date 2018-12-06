var button = document.getElementById('logout');
var buttonLog = document.getElementById('logout');

button.addEventListener('click', function() {
  setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
  location.href = '../../Main-Page/index.html';
})

buttonLog.addEventListener('click', function() {
  setCookie('session', '', 'Thu, 01 Jan 1970 00:00:00 UTC');
  location.href = '../../Main-Page/index.html';
})
