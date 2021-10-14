toxicity.load().then(model => {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.input) {
                model.classify(request.input).then(predictions => {
                    const toxicityResults = predictions[6]['results'];

                    let toxicityProbs = [];
                    for (let i = 0; i < toxicityResults.length; i++) {
                        toxicityProbs.push(toxicityResults[i]['probabilities'][1])
                    }

                    sendResponse({ toxicityProbs: toxicityProbs });
                });
                return true;
            }
        }
    );
});