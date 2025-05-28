window.onload = function() {

  var messagesEl = /** @type {HTMLElement} */(document.querySelector('.messages'));
  var typingSpeed = 1;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;
}
  var getCurrentTime = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 5 && current < 12) return 'Good morningg! Enjoy your dayyy!';
    if (current >= 12 && current < 18) return 'How are youuu? Hope you\'re enjoying your dayy!';
    if (current >= 18 && current < 23) return 'How was your dayy? Nagdinner ka na?';
    if (current >= 23 || current < 5) return 'Bat gising ka paaaa? Are you okayy? Tell me if you need anything. Dito lng ako.';
  }

  var messages = [
    'Fate!!!',
    'Hiii',
    'I made you something! I know this is long, long, long overdue na hehe.  It\'s not finished yet, but you can expect to see some few stuff here already.',
    'Inside, you’ll find pieces of me. Our story. My thoughts, the things I’ve learned about you, the moments that made me fall for you, and everything I love about you.',
    'It’s a collection of us, of the way you make my world feel a lot brighter.',
    'I hope you’ll love it as much as I loved making it for you.',
    'Oh and',
    getCurrentTime(),
    'I miss youuuu! Can\'t wait to see you again after this break',
    'I love you so muchhh, my baby, my sweet Fate',
    '~ Neil ❤️',
    '<a href="part1.html" style="text-decoration: none; color: purple;" id= "yes-button" class="yes-button" onclick="handleYesClick()">(Next Page) Where it All Began...</a>',
  '<em><a href="part1.html" style="text-decoration: none; color: Black;">Skip to Parts: </a><br><a href="part1.html" style="text-decoration: none; color: purple;" id= "yes-button" class="yes-button" onclick="handleYesClick()">P1: Where it all began</a><br><a href="part2.html" style="text-decoration: none; color: purple;" id= "yes-button" class="yes-button" onclick="handleYesClick()">P2: Chaya Lunch Date</a></em>',
  ];


  var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
  }

  var createBubbleElements = function(message, position) {
    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');
    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add('is-loading');
    bubbleEl.classList.add('cornered');
    bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = `0`;
    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  var getDimentions = function(elements) {
    const messageW = elements.message.offsetWidth + 2;
    const messageH = elements.message.offsetHeight;
    const messageS = getComputedStyle(elements.bubble);
    const paddingTop = Math.ceil(parseFloat(messageS.paddingTop));
    const paddingLeft = Math.ceil(parseFloat(messageS.paddingLeft));
    return {
      loading: {
        w: '4rem',
        h: '2.25rem'
      },
      bubble: {
        w: pxToRem(messageW + paddingLeft * 2),
        h: pxToRem(messageH + paddingTop * 2)
      },
      message: {
        w: pxToRem(messageW),
        h: pxToRem(messageH)
      }
    }
  }

  var sendMessage = function(message, position) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 5;
    var elements = createBubbleElements(message, position);
    messagesEl.appendChild(elements.bubble);
    messagesEl.appendChild(document.createElement('br'));
    var dimensions = getDimentions(elements);
    elements.message.style.display = 'block';
    elements.bubble.style.width = '0rem';
    elements.bubble.style.height = dimensions.loading.h;
    elements.message.style.width = dimensions.message.w;
    elements.message.style.height = dimensions.message.h;
    elements.bubble.style.opacity = `1`;
    var bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
    if (bubbleOffset > messagesEl.offsetHeight) {
      var scrollMessages = anime({
        targets: messagesEl,
        scrollTop: bubbleOffset,
        duration: 750
      });
    }
    var bubbleSize = anime({
      targets: elements.bubble,
      width: ['0ch', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 800,
      easing: 'easeOutElastic'
    });
    var loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, .95],
      duration: 1100,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    var dotsStart = anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [.5, 1],
      duration: 400,
      delay: 25,
      easing: 'easeOutElastic',
    });
    var dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [.5, 1],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: function(i) {return (i * 100) + 50}
    });
    setTimeout(function() {
      loadingLoop.pause();
      dotsPulse.restart({
        opacity: 0,
        scale: 0,
        loop: false,
        direction: 'forwards',
        update: function(a) {
          if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
            elements.bubble.classList.remove('is-loading');
            anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 300,
            });
          }
        }
      });
      bubbleSize.restart({
        scale: 1,
        width: [dimensions.loading.w, dimensions.bubble.w ],
        height: [dimensions.loading.h, dimensions.bubble.h ],
        marginTop: 0,
        marginLeft: 0,
        begin: function() {
          if (messageIndex < messages.length) elements.bubble.classList.remove('cornered');
        },
      })
    }, loadingDuration - 50);
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
  }

  sendMessages();

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    fetch("https://script.google.com/macros/s/AKfycbznfjxS6xmKGeDq11WVVFL-fuVVTbylbUWTn4EGXASyRcoZmfP82CYtWnPXzI9FOvbJiQ/exec")
    alert("Six parts. Six sides. Our story. The story of how we met, fell quietly, stayed, and kept making each other smile. A story of how everything became as it was, only very slightly different. This is us.");
    window.location.href = "yes_page.html";
}
