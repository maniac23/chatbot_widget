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
});

// отправка по нажатию на enter
$(window).on('keydown', function(e) {
  if (e.which === 13) {
    insertMessage();
    return false;
  }
});

// анимация "вам пишут"
function loadingMessage() {
  $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
}

// отправка сообщения "ботом"
function botMessage(messageText) {
  loadingMessage();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + messageText + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);

}

// форма с выбором ответа
function secondMessage() {
  loadingMessage();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + 'Как вам удобнее получить ответ?' + '<form action="" id="answer"><input type="radio" name="how" id="email"><label for="email">По email </label><input type="radio" name="how" id="tel"><label for="tel">По телефону </label><input type="submit" value="Ответить"></form></div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);
}

// форма если выбран email
function emailForm() {
  loadingMessage();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>Оставьте свое имя и email и мы вам ответим<form action="" id="email-form"><input type="text" name="name" id="name" placeholder="Введите ваше имя" required><input type="email" name="email" id="email" placeholder="Введите ваш email" required><input type="submit" value="Ответить"></form></div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);
}
// форма если выбран tel
function telForm() {
  loadingMessage();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>Оставьте свое имя и номер телефона и мы вам позвоним<form action="" id="tel-form"><input type="text" name="name" id="name" placeholder="Введите ваше имя" required><input type="tel" name="tel" id="tel" placeholder="Введите ваш телефон" required><input type="submit" value="Ответить"></form></div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);
}



$('body').on('submit', '#answer', function(event) {
  var email = $('#answer input[id="email"]');
  var tel = $('#answer input[id="tel"]');
  if(email.is(':checked')) {
    emailForm();
  } else if(tel.is(':checked')) {
    telForm();
  } else {
    botMessage('Может попробуем еще раз?');
    setTimeout(function() {
      secondMessage();
    }, 500);
  }

  event.preventDefault();
});

// обработчик формы emailForm
$('body').on('submit', '#email-form', function(event) {
  event.preventDefault();
  formSubmit('#email-form');
});
// обработчик формы tel
$('body').on('submit', '#tel-form', function(event) {
  event.preventDefault();
  formSubmit('#tel-form');
});

// ajax отправка форм
function formSubmit(form) {
  var formData = $(form).serialize();
  $.ajax({
    type: 'POST',
    url: '../mail.php',
    data: formData,
    success: function(data) {
      console.log('форма отправлена' + data);
        // показать сообщение
      botMessage('Спасибо! Мы скоро с вами свяжемся!');
    },
    error: function(xhr, str) {
      console.log('Возникла ошибка: ' + xhr.responseCode);
      // сообщение
    }
  });
}

// TODO запилить закрытие/ открытие формы
$('.button').click(function() {
  $('.menu .items span').toggleClass('active');
  $('.menu .button').toggleClass('active');
});

// TODO запилить валидацию
// TODO запилить php обработчик
