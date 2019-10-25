const utils = require('../utils');
const config = require('../../config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

// noinspection JSUnresolvedFunction
let plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress  : {
            warnings : false,
        },
        sourceMap : true,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
        filename : utils.assetsPath('css/[name].[contenthash:7].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessorOptions : {
            safe : true,
        },
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
];

if (config.build.productionGzip) {
    let CompressionWebpackPlugin = require('compression-webpack-plugin');

    plugins.push(
        new CompressionWebpackPlugin({
            asset     : '[path].gz[query]',
            algorithm : 'gzip',
            test      : new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold : 10240,
            minRatio  : 0.8,
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = plugins;
