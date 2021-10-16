const THRESHOLD = 0.5;

function addScore(textElement, score) {
  const span = document.createElement('span');

  if (score >= THRESHOLD) {
    span.style.color = 'red';
  }

  span.innerHTML = `Toxicity Score: ${score.toFixed(2)}<br>`;
  textElement.prepend(span);
}

function happify(timeline) {
  const tweets = timeline.children[0].querySelectorAll(':scope > div:not([happified])');

  // TODO add to queue and process queue as different calls
  if (tweets.length <= 3) {
    return;
  }

  const textElements = [];

  for (let i = 0; i < tweets.length; i += 1) {
    const tweet = tweets[i];
    const textElement = tweet.querySelector('[lang=en]');
    if (textElement != null) {
      textElements.push(textElement);
    }
    tweet.setAttribute('happified', '');
  }

  chrome.runtime.sendMessage({ input: textElements.map((e) => e.textContent) }, (response) => {
    for (let i = 0; i < textElements.length; i += 1) {
      addScore(textElements[i], response.toxicityProbs[i]);
    }
  });
}

setInterval(() => {
  const timeline = document.querySelector('[aria-label*="Timeline"]');
  if (timeline) {
    happify(timeline);
  }
}, 100);

// setInterval(function () {
//     const timeline = document.querySelector('[aria-label*="Timeline:"]');

//     const observerOptions = {
//         childList: true,
//         attributes: false,
//         subtree: true
//     }
//     const observer = new MutationObserver(() => happify(timeline));

//     observer.observe(timeline, observerOptions);
// }, 1000);
