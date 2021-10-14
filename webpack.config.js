const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        background: './src/background.js',
        content: './src/content.js',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' }
            ]
        })
    ]
}