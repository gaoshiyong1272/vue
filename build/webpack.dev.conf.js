const utils = require('./utils');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

// noinspection JSUnresolvedFunction
module.exports = merge(baseWebpackConfig, {
    output  : {
        publicPath : "/slimvue-website/dist/",
    },
    module  : {
        rules : utils.styleLoaders({sourceMap : config.build.cssSourceMap}),
    },
    // cheap-module-eval-source-map is faster for development
    devtool : '#cheap-module-eval-source-map',
    plugins : ([]).concat(
        require('./plugins/clean-plugin'),
        require('./plugins/common-trunks-plugin'),
        require('./plugins/copy-files-plugin'),
        require('./plugins/dev-plugin')
    ),
});
