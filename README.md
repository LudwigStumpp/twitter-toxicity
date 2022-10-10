# twitter-toxicity
A Browser Plugin to evaluate the toxicity level of Twitter Tweets. Based on the [Tensorflow.js Toxicity Classifier](https://github.com/tensorflow/tfjs-models/blob/master/toxicity/README.md).

## 1. Demo
![current_status](https://user-images.githubusercontent.com/42147848/170800205-4dd37317-83fd-4b86-926c-df059ad62fc8.gif)

## 2. Browser Support
Currently only supports Chrome browser. If I find some time, I will make it work on Firefox as well.

## 3. How to use
Currently the plugin has not yet been published to the Chrome extension store. Therefore, you need to add it to your Chrome browser on your own. These are the required steps:

1. Download the `dist.zip` folder in the latest release and unpack.
2. Open your local extensions page of your Chrome browser. In the top left corner click on `Load unpacked` and select the `dist` directory.
3. Visit `https://twitter.com`.

In order to test the behaviour of the toxicity predictor, a click on the plugin icon opens a form where one can check the toxicity of any arbitrary text.
