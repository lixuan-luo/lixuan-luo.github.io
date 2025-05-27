window.onload = function() {

  var messagesEl = /** @type {HTMLElement} */(document.querySelector('.messages'));
  var typingSpeed = 5;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;

  var messages = [
    'Hiii, Fate! Let\'s start from the beginning',
    'From the moment I noticed you.',
    'From the moment you caught my eye.',
    'From the moment you made me pause and breathe as I started to admire you.',
    'From the moment you became my crush.',
    'Are you readyyyy?',
    '<em>Part 1: Crush</em>',
    'Each time you spoke, I wanted to hear what you had to say. Your perspectives on different subjects caught my curiosity. I admired the way you spoke, the way you always knew the right words to say. I was always ready to listen. But in those early days, the only time I could was in class, when our professors asked you questions, and you answered effortlessly, leaving them impressed and me in awe.',
    'I was entranced by you. Your beauty. Your elegance. Your passion. Your mind. Your movements. Your voice. I was curious. I was obsessed. And all I could do was watch from a distance, admiring you in silence as you worked. I admired everything you were, everything you said, everything you did.',
    'I couldn’t get you out of my head. To distract myself, I wanted to translate what I felt into something I could hold onto. I composed this piece to turn what I felt into music, something real, something I could always come back to.',
    '<video src="assets/senticherde.mp4" controls preload="metadata" style="width:90%; marginLeft:10%; paddingLeft: 10%; border-radius: 10px;"></video>',
    '<em>S\'enticher de</em> - 07/19/2024',
    'I named this piece “S\'enticher de”, a reflection of just how crazyyyyy I was for you. OA ba? Hehe. Anyway, in this piece my focus was to play with different intensities to show how my feelings were very inconsistent at the time. Still, there was one thing I was completely sure of, I liked you, and I had to make a move.',
    'And so… Monaco Grand Prix 2024 happened. A few drinks here, a few cries there, got drunk, and finally! I sent the message. This is where it all began.',
    'I needed to quench the thirst, the endless curiosity, about who you were, what you liked, how you’d think, how you moved. I wanted to know everything. I wanted to study you.',
    'And so, with no excuse other than Formula 1 races, I made sure to message you for every Grand Prix that came after, and for each conversation we had, I learned more about you, and I became more and more curious.',
    'S\'enticher de. I was infatuated, I was obsessed. You were the most profound woman I had ever seen. You were perfect.',
    'While I was composing this piece, I was thinking of Lord Byrons poem. With each line, I saw you. With each line, I was reminded of your beauty.',
    'She walks in beauty, like the night <br>Of cloudless climes and starry skies;<br>And all that’s best of dark and bright<br>Meet in her aspect and her eyes;<br>Thus mellowed to that tender light<br>Which heaven to gaudy day denies.<br><br>One shade the more, one ray the less,<br>Had half impaired the nameless grace<br>Which waves in every raven tress,<br>Or softly lightens o’er her face;<br>Where thoughts serenely sweet express,<br>How pure, how dear their dwelling-place.<br><br>And on that cheek, and o’er that brow,<br>So soft, so calm, yet eloquent,<br>The smiles that win, the tints that glow,<br>But tell of days in goodness spent,<br>A mind at peace with all below,<br>A heart whose love is innocent!',
    '<a href="part2.html" style="text-decoration: none; color: purple;">(Next Page) First Date...</a>',
  ]

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
  const video = elements.message.querySelector('video');
  let messageW, messageH;

  if (video) {
    // Use intrinsic dimensions if available, fallback to client or offset
    messageW = (video.videoWidth || video.clientWidth) || elements.message.offsetWidth;
    messageH = (video.videoHeight || video.clientHeight) || elements.message.offsetHeight;
  } else {
    messageW = elements.message.offsetWidth;
    messageH = elements.message.offsetHeight;
  }
  
  messageW += 2; // small buffer for borders/margins


  const messageS = getComputedStyle(elements.bubble);
  const paddingTop = Math.ceil(parseFloat(messageS.paddingTop));
  const paddingLeft = Math.ceil(parseFloat(messageS.paddingLeft));
  const paddingBottom = Math.ceil(parseFloat(messageS.paddingBottom)); // new!

  return {
    loading: {
      w: '4rem',
      h: '2.25rem'
    },
    bubble: {
      w: pxToRem(messageW + paddingLeft * 2),
      h: pxToRem(messageH + paddingTop * 2) // +10px extra
    },
    message: {
      w: pxToRem(messageW),
      h: pxToRem(messageH)
    }
  }
}



 var sendMessage = function(message, position) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 2;
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

}
