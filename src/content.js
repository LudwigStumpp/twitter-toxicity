const THRESHOLD = 0.5;
const CHECK_ATTR = 'toxicity-checked';

function addScore(tweet, score) {
  const span = document.createElement('span');

  if (score >= THRESHOLD) {
    span.style.color = 'red';
  }

  span.innerHTML = `Toxicity Score: ${score.toFixed(2)}<br>`;
  tweet.prepend(span);
}

function happify(timeline) {
  const tweets = timeline.children[0].querySelectorAll(`[lang=en]:not([${CHECK_ATTR}])`);

  // TODO add to queue and process queue as different calls
  if (tweets.length <= 3) {
    return;
  }

  for (let i = 0; i < tweets.length; i += 1) {
    tweets[i].setAttribute(`${CHECK_ATTR}`, '');
  }

  chrome.runtime.sendMessage({ input: [...tweets].map((e) => e.textContent) }, (response) => {
    try {
      for (let i = 0; i < tweets.length; i += 1) {
        if (response) {
          addScore(tweets[i], response.toxicityProbs[i]);
        } else {
          tweets[i].removeAttribute(`${CHECK_ATTR}`);
        }
      }
    } catch (e) {
      for (let i = 0; i < tweets.length; i += 1) {
        tweets[i].removeAttribute('happified');
      }
      console.error(e);
    }
  });
}

setInterval(() => {
  const timeline = document.querySelector('[aria-label*="Timeline"]');
  if (timeline) {
    happify(timeline);
  }
}, 100);
