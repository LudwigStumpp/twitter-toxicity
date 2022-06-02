import './style.scss';

const THRESHOLD = 0.5;
const CHECK_ATTR = 'toxicity-checked';

function addLabelAndReturnElement(tweet) {
  const div = document.createElement('div');
  div.className = 'toxicity-label';
  const span = document.createElement('span');
  div.appendChild(span);
  tweet.prepend(div);
  return div;
}

function addScore(tweet, score) {
  let div = tweet.querySelector('.toxicity-label');
  if (!div) {
    div = addLabelAndReturnElement(tweet);
  }
  const span = div.querySelector('span');

  span.className = score >= THRESHOLD ? 'toxicity-score--nok' : 'toxicity-score--ok';
  span.innerHTML = `Toxicity Score: ${score.toFixed(2)}<br>`;

  tweet.prepend(div);
}

function addWait(tweet) {
  let div = tweet.querySelector('.toxicity-label');
  if (!div) {
    div = addLabelAndReturnElement(tweet);
  }
  const span = div.querySelector('span');

  span.className = 'toxicity-score--wait';
  span.innerHTML = 'Waiting for Toxicity Score';
}

function happify(timeline) {
  const tweets = timeline.children[0].querySelectorAll(`[lang=en]:not([${CHECK_ATTR}])`);

  // TODO add to queue and process queue as different calls
  if (tweets.length <= 3) {
    return;
  }

  // read text before adding wait label to avoid reading the content of the wait label as well
  const texts = [...tweets].map((e) => e.textContent);

  for (let i = 0; i < tweets.length; i += 1) {
    tweets[i].setAttribute(`${CHECK_ATTR}`, '');
    addWait(tweets[i]);
  }

  chrome.runtime.sendMessage({ input: texts }, (response) => {
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
