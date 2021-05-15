const path = require('path');

let mode = process.argv[4].slice(2)

let isDevelopment = mode == 'development'

module.exports = {
    mode,
    watch: isDevelopment ? true : false,
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'web-capture.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

        ]
    }
};
