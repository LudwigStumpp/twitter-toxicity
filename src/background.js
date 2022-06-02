import '@tensorflow/tfjs';
import { load } from '@tensorflow-models/toxicity';

function preprocess(text) {
  return text.replace(/[^a-zA-Z. ]/g, '').toLowerCase();
}

load().then((model) => {
  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.input) {
        model.classify(request.input.map((el) => preprocess(el))).then((predictions) => {
          const toxicityResults = predictions[6].results;

          const toxicityProbs = [];
          for (let i = 0; i < toxicityResults.length; i += 1) {
            toxicityProbs.push(toxicityResults[i].probabilities[1]);
          }

          sendResponse({ toxicityProbs });
        });
        return true;
      }
      return true;
    },
  );
});
