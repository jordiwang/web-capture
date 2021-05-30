const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '../src/worker.js'),
    output: {
        filename: 'worker.js',
        path: path.resolve(__dirname, '../tmp')
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
            WASM_PATH: JSON.stringify(`${process.env.WASM_PATH}`)
        })
    ]
};

