window.addEventListener('load', function () {
    const threshold = 0.9;
    const textElement = document.getElementById('textInput');
    const submitButton = document.getElementById('submit');
    const response = document.getElementById('response');

    function cleanText(rawText) {
        return rawText.replace('#', '');
    }

    toxicity.load(threshold).then(model => {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            const text = textElement.value;
            const textCleaned = cleanText(text);

            model.classify(textCleaned).then(predictions => {
                console.log(predictions)
                const toxicityProb = predictions[6]['results'][0]['probabilities'][1];
                response.innerHTML = toxicityProb;
            });
        });
    });
})