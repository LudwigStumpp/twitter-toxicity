toxicity.load(0.5).then(model => {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.input) {
                model.classify(request.input).then(predictions => {
                    const toxicityProb = predictions[6]['results'][0]['probabilities'][1];
                    console.log(toxicityProb);
                    sendResponse({ toxicityProb: toxicityProb });
                });
                return true;
            }
        }
    );
});