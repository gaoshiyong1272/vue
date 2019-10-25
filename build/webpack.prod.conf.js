const utils = require('./utils');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

// noinspection JSUnresolvedFunction
let webpackConfig = merge(baseWebpackConfig, {
    module  : {
        rules : utils.styleLoaders({
            sourceMap : config.build.cssSourceMap,
            extract   : true,
        }),
    },
    devtool : config.build.cssSourceMap ? '#source-map' : false,
    output  : {
        path          : config.build.buildOutputRoot,
        filename      : 'js/[name].[chunkhash:7].js',
        chunkFilename : 'js/[id].[chunkhash:7].js',
    },
    plugins : ([]).concat(
        require('./plugins/clean-plugin'),
        require('./plugins/common-trunks-plugin'),
        require('./plugins/copy-files-plugin'),
        require('./plugins/optimize-plugin')
    ),
});

module.exports = webpackConfig;
