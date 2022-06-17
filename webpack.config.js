const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path:path.join(__dirname + '/dist') ,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        })
    ]
};