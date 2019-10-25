const merge = require('webpack-merge');
const utils = require('./utils');
const resolveConfig = require('./resolve.conf');
const config = require('../config');
const rread = require('recursive-readdir-sync');
const fs = require("fs-extra");

let transformToRequire = {
    video  : 'src',
    source : 'src',
    img    : 'src',
    image  : 'xlink:href',
};

let includedDir = resolveConfig.resolve('build/custom-transform-to-require-settings');
if (fs.existsSync(includedDir)) {
    let resolveDeps = rread(includedDir);
    // noinspection JSUnresolvedFunction
    resolveDeps.forEach(filename => {
        let fileContent = fs.readJsonSync(filename);
        transformToRequire = merge(transformToRequire, fileContent);
    });
}

const customTransforms = require('../config/transform-settings');
transformToRequire = merge(transformToRequire, customTransforms);
// console.log("transform-to-require: ", transformToRequire);

module.exports = {
    loaders            : utils.cssLoaders({
        sourceMap : config.build.cssSourceMap,
        extract   : config.isProduction(),
    }),
    transformToRequire : transformToRequire,
};
