const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// noinspection JSDeprecatedSymbols
module.exports = [
    // https://webpack.js.org/plugins/no-emit-on-errors-plugin/
    new webpack.NoEmitOnErrorsPlugin(),
    // // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //     filename : 'index.html',
    //     template : 'index.html',
    //     inject   : true
    // }),
    new FriendlyErrorsPlugin({clearConsole : false}),
];
