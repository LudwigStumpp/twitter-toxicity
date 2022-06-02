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
      if (response) {
        try {
          const TOXICITY_PROB = response.toxicityProbs[0];
          RESPONSE.innerHTML = TOXICITY_PROB.toFixed(2);
        } catch (e) {
          console.error(e);
        } finally {
          // enable
          TEXT_INPUT.disabled = false;
          SUBMIT_BUTTON.disabled = false;
        }
      }
    });
  });
});
