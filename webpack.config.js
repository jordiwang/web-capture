const webpack = require('webpack');
const path = require('path');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const PrettierWebpackPlugin = require('prettier-webpack-plugin');

let mode = process.argv[4].slice(2)

let isDevelopment = mode == 'development'

let prodPlugin = [
    new PrettierWebpackPlugin(),
]


module.exports = {
    mode,
    watch: isDevelopment ? true : false,
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'web-capture.js',
        path: path.resolve(__dirname, './')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: isDevelopment ? ['babel-loader'] : ['babel-loader', 'eslint-loader']
            },

        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
    ].concat(isDevelopment ? [] : prodPlugin),


};
