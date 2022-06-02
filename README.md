# twitter-toxicity
A Browser Plugin to evaluate the toxicity level of Twitter Tweets.

## 1. Demo
![current_status](https://user-images.githubusercontent.com/42147848/170800205-4dd37317-83fd-4b86-926c-df059ad62fc8.gif)

## 2. Browser Support
Currently only supports Chrome browser. If I find some time, I will make it work on Firefox as well.

## 3. How to use
Currently the plugin has not yet been published to the Chrome extension store. Therefore, you need to build it on your own. These are the required steps:

1. Download the repository
2. Install compatible node version. If you use `nvm` you can do so by executing `nvm use`, `nvm install`.
3. Install node packages: `npm install .`
4. Build the extension: `npm run build`. The extension can now be found in the `dist` folder.
5. Open your local extensions page of your Chrome browser. In the top left corner click on `Load unpacked` and select the `dist` directory.
6. Visit `https://twitter.com`.
