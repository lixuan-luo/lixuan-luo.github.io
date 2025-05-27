window.onload = function() {

  var messagesEl = /** @type {HTMLElement} */(document.querySelector('.messages'));
  var typingSpeed = 5;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;

  var messages = [
  '<em>Part 2: Chaya Lunch Date</em>',
  '<img src="assets/chaya.jpeg" style="width:250px; max-width:500px; border-radius:10px; margin:auto;">',
  '<em>Picture by Sharmaine Galima (10/06/2024)</em>',
  'Fate is a beautifully complex person, someone who never ceases to amaze me with her wonder and depth, and whom I will never tire of learning about. She has the most beautiful heart, one that is kind and considerate, yet carries a paradoxical nature that makes her all the more intriguing. She has the most beautiful mind, one that is intelligent, creative, and capable of seeing beauty in ways that few can. She holds a romantic view of life, yet her indecisiveness sometimes contrasts with her driven nature.',
  'I like how she’s flawed, imperfect in ways that make her feel real and grounded. Her openness to plans shows her trust and willingness to be present. She can be both fiercely independent and quietly vulnerable, creating a duality that invites understanding rather than judgment.',
  'Fate is someone whose values and perspectives inspire admiration. She sees the beauty in things that others might overlook. She has the most artistic soul, reflected in her love for creating the most wonderful art and for appreciating art. She’s funny, cute, smart, and she brings a sense of warmth wherever she goes. She\'s just amazing. She\'s sunshine and beauty.',
  'Being with her feels like solving a beautiful puzzle, one that is full of surprises, not to fix, but to be studied and to admire each piece of her as it fits into place.  She challenges me to grow, to be patient, and to see the world through her uniquely vibrant lens. Fate is, quite simply, a person you don’t just like, she\'s someone you love, admire, cherish, and endlessly want to understand.',
  '<a href="part2.html" style="text-decoration: none; color: purple;">(Next Page) Alone with you in the Ether... (Can’t wait to share this with you! Almost done.)</a>',
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
  const image = elements.message.querySelector('img');
  let messageW, messageH;

  if (image) {
    // If the image hasn't loaded yet, wait and re-measure once it does
    if (!image.complete) {
      image.onload = () => {
        // Recalculate layout or re-render if needed
        // You can trigger your layout update function here
        console.log("Image loaded. You may need to remeasure.");
      };
    }

    // Use natural size if available, fallback to client size or container
    messageW = (image.naturalWidth || image.clientWidth) || elements.message.offsetWidth;
    messageH = 250;
  } else {
    // If there's no image, fall back to message container
    messageW = elements.message.offsetWidth;
    messageH = elements.message.offsetHeight;
  }

  messageW += 2; // Add small buffer

  // Get computed styles
  const messageS = getComputedStyle(elements.bubble);
  const paddingTop = Math.ceil(parseFloat(messageS.paddingTop));
  const paddingBottom = Math.ceil(parseFloat(messageS.paddingBottom));
  const paddingLeft = Math.ceil(parseFloat(messageS.paddingLeft));
  const paddingRight = Math.ceil(parseFloat(messageS.paddingRight));

  return {
    loading: {
      w: '4rem',
      h: '2.25rem'
    },
    bubble: {
      w: pxToRem(messageW + paddingLeft + paddingRight),
      h: pxToRem(messageH + paddingTop + paddingBottom)
    },
    message: {
      w: pxToRem(messageW),
      h: pxToRem(messageH)
    }
  };
};





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

}
