const config = require('../../config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const resolveConfig = require('../resolve.conf');
const fs = require("fs-extra");
const rread = require('recursive-readdir-sync');

let patterns = [
    {
        from   : path.resolve(__dirname, '../../static'),
        to     : path.join(config.build.buildOutputRoot, 'static'),
        ignore : ['.*'],
    },
];

let includedDir = resolveConfig.resolve('build/copy-file-settings');
if (fs.existsSync(includedDir)) {
    let copyFileSettings = rread(includedDir);
    // noinspection JSUnresolvedFunction
    copyFileSettings.forEach(filename => {
        let fileContent = fs.readJsonSync(filename);
        let from   = path.join(resolveConfig.resolve("node_modules"), fileContent.module, fileContent.from),
            to     = path.join(config.build.buildOutputRoot, fileContent.module),
            ignore = fileContent.ignores;
        patterns.push = {from, to, ignore};
        console.log("Copy from " + from + " to " + to + " , ignores " + ignore);
    });
}

module.exports = new CopyWebpackPlugin(patterns);
