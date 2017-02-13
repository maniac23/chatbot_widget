var $messages = $('.messages-content'),
  d, h, m,
  i = 0;

// инициализируем кастомный скроллбар
$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    botMessage('Чего изволите, сударь?');
  }, 100);
});

// прокрутка скроллбара
function updateScrollbar() {
  $messages.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

// функция для установки даты отправки
function setDate() {
  d = new Date();
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    if(m < 10) {
      m = '0' + m;
    }
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}

// отправка сообщения пользователем
function insertMessage() {
  var msg = $('.message-input').val();
  if ($.trim(msg) === '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    secondMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
  secondMessage();
});

// отправка по нажатию на enter
$(window).on('keydown', function(e) {
  if (e.which === 13) {
    insertMessage();
    return false;
  }
});

var Fake = [
  'Hi there, I\'m Jesse and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
];


// отправка сообщения "ботом"
function botMessage(messageText) {
  $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + messageText + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);

}
function secondMessage(messageText) {
  $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + 'Как вам удобнее получить ответ?<form action=""><label for="email">По email <input type="radio" name="how" id="email"></label><label for="tel">По телефону <input type="radio" name="how" id="tel"></label></form>' + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);

}

$('.button').click(function() {
  $('.menu .items span').toggleClass('active');
  $('.menu .button').toggleClass('active');
});
