const config = require('../../config');
const webpack = require('webpack');

// http://vuejs.github.io/vue-loader/en/workflow/production.html
// noinspection JSUnresolvedFunction
module.exports = new webpack.DefinePlugin({
    'process.env' : config.build.env,
});
