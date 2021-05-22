const path = require('path');



module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'capture.js',
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
    }
};
