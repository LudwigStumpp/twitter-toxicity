function addScore(textElement, score) {
    const span = document.createElement("span");
    span.innerHTML = `Toxicity Score: ${score}<br>`;
    textElement.prepend(span);
}

function happify(timeline) {
    console.log('change detected');

    const tweets = timeline.children[0].querySelectorAll(":scope > div:not([happified])");

    for (let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];

        const textElement = tweet.querySelector('[lang=en]')
        if (textElement != null) {
            const textContent = textElement.textContent;
            chrome.runtime.sendMessage({ input: textContent }, function (response) {
                console.log(textContent, response.toxicityProb);
                addScore(textElement, response.toxicityProb);
            });
        }

        tweet.setAttribute('happified', '');
    }
}

setTimeout(function () {
    const timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');

    const observerOptions = {
        childList: true,
        attributes: false,
        subtree: true
    }
    const observer = new MutationObserver(() => happify(timeline));

    observer.observe(timeline, observerOptions);
}, 5000);