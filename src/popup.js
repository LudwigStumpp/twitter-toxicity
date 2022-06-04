window.addEventListener('load', () => {
  const TEXT_INPUT = document.getElementById('textInput');
  const SUBMIT_BUTTON = document.getElementById('submit');
  const RESPONSE = document.getElementById('response');

  SUBMIT_BUTTON.addEventListener('click', (event) => {
    event.preventDefault();
    const text = TEXT_INPUT.value;

    // disable by setting disable attribute
    TEXT_INPUT.disabled = true;
    SUBMIT_BUTTON.disabled = true;

    chrome.runtime.sendMessage({ input: [text] }, (response) => {
      if (!chrome.runtime.lastError && response) {
        try {
          const TOXICITY_PROB = response.toxicityProbs[0];
          RESPONSE.placeholder = `${TOXICITY_PROB.toFixed(2) * 100} %`;
        } catch (e) {
          console.error(e);
        }
      } else {
        RESPONSE.placeholder = 'Error. Please try again.';
      }
      // enable
      TEXT_INPUT.disabled = false;
      SUBMIT_BUTTON.disabled = false;
    });
  });
});
