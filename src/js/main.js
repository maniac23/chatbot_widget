(function() {
  $('head').append('<link rel=\'stylesheet\' type=\'text/css\' href=\'css/main.css\'/>');

  var answerForm = $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>Как вам удобнее получить ответ?<form action="" id="answer"><input type="radio" name="how" id="email"><label for="email">По email </label><input type="radio" name="how" id="tel"><label for="tel">По телефону </label><input type="submit" value="Ответить"></form></div>');

  var emailForm = $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>Оставьте свое имя и email и мы вам ответим<form action="" id="email-form"><input type="text" name="name" id="name" placeholder="Введите ваше имя" required pattern="[A-Za-z]+"><input type="email" name="email" id="email" placeholder="Введите ваш email" required><input type="submit" value="Ответить"></form></div>');

  var telForm = $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>Оставьте свое имя и номер телефона и мы вам позвоним<form action="" id="tel-form"><input type="text" name="name" id="name" placeholder="Введите ваше имя" required pattern="[A-Za-z]+"><input type="tel" name="tel" id="tel" placeholder="Введите ваш телефон" required pattern="[0-9]+"><input type="submit" value="Ответить"></form></div>');

  $('.messenger').html('<div class="menu"><div class="button">...</div></div><div class="chat"><div class="chat-title"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><div><h1>Аристарх Сигизмундович</h1><h2>Консультант</h2></div></div><div class="messages-wrap"><div class="messages"><div class="messages-content"></div></div><div class="message-box"><textarea type="text" class="message-input" placeholder="Type message..."></textarea><button type="submit" class="message-submit">Send</button></div></div></div>');

  var $messages = $('.messages-content'),
    d, h, m;

  var openTimeout = setTimeout(function() {
    openMessenger();
  }, 5000);

// инициализируем кастомный скроллбар
  $(window).load(function() {
    $messages.mCustomScrollbar();
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
  // отвечаем на соообщение
    setTimeout(function() {
      sendForm(answerForm);
    }, 1000 + (Math.random() * 20) * 100);
  }

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

// функция для отправки форм
  function sendForm(form) {
    loadingMessage();
    setTimeout(function() {
      $('.message.loading').remove();
      form.appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
    }, 1000 + (Math.random() * 20) * 100);
  }

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

  function openMessenger() {
    $('.messages-wrap').slideToggle().css('display', 'flex');
    $('.messenger').toggleClass('active');
    if(!$('.messenger').hasClass('active')) {
      $('.mCSB_container').empty();
    } else {
      botMessage('Чего надобно?');
    }
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

  $('body').on('submit', '#answer', function(event) {
    var email = $('#answer input[id="email"]');
    var tel = $('#answer input[id="tel"]');
    if(email.is(':checked')) {
      sendForm(emailForm);
    } else if(tel.is(':checked')) {
      sendForm(telForm);
    } else {
      botMessage('Может попробуем еще раз?');
      setTimeout(function() {
        sendForm(answerForm);
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


  $('.button').click(function() {
    clearTimeout(openTimeout);
    openMessenger();
  });

})();
