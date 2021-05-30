
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

let wasmString = fs.readFileSync(path.join(__dirname, '../tmp/capture.wasm'), 'base64')
let workerString = fs.readFileSync(path.join(__dirname, '../tmp/capture.js'), 'utf-8')

workerString = workerString.replace(/WASM_STRING/, `"${wasmString}"`)

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'web-capture.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            WORKER_STRING: JSON.stringify(`${workerString}`)
        })
    ]
};