import '@tensorflow/tfjs';
import { load } from '@tensorflow-models/toxicity';

load().then((model) => {
  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.input) {
        model.classify(request.input).then((predictions) => {
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
