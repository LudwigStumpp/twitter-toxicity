setInterval(function () {
    const timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    const tweets = timeline.children[0].children;

    for (let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];

        const textElement = tweet.querySelector('[lang=en]')
        if (textElement != null) {
            const textContent = textElement.textContent;
            chrome.runtime.sendMessage({ input: textContent }, function (response) {
                console.log(textContent, response.toxicityProb);
            });
        }
    }
}, 5000);