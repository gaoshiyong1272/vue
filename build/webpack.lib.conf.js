const utils = require('./utils');
const resolveConfig = require('./resolve.conf');
let config = require('../config');
// config.build.assetsSubDirectory = resolveConfig.projectName + "/" + config.build.assetsSubDirectory;
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

// noinspection JSUnresolvedFunction
let webpackConfig = merge(baseWebpackConfig, {
    module    : {
        rules : utils.styleLoaders({
            sourceMap : config.build.cssSourceMap,
            extract   : true,
        }),
    },
    devtool   : config.build.cssSourceMap ? '#source-map' : false,
    entry     : resolveConfig.resolve(resolveConfig.projectName + '/publish.js'),
    output    : {
        path          : config.build.buildOutputRoot,
        filename      : 'publish.js',
        publicPath    : "/" + resolveConfig.projectName + "/",
        libraryTarget : 'umd',
    },
    externals : {
        moment : 'moment',
    },
    plugins   : ([]).concat(
        require('./plugins/clean-plugin'),
        require('./plugins/copy-files-plugin'),
        require('./plugins/optimize-plugin')
    ),
});

module.exports = webpackConfig;
