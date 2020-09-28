const path = require('path')
const cleanPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname,
            'assets',
            'scripts'),
        publicPath: 'assets/scripts/'
    },
    plugins: [new cleanPlugin.CleanWebpackPlugin()]
};