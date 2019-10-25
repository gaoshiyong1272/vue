"use strict";

const path = require('path');
const rread = require('recursive-readdir-sync');
const fs = require('fs-extra');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

let projectName = fs.readJsonSync(resolve('package.json')).name;

let alias = {
    'vue$'     : 'vue/dist/vue.esm.js',
    'slimvue$' : resolve('slimvue.js'),
};

let includedDir = resolve('build/resolve-deps');
if (fs.existsSync(includedDir)) {
    let resolveDeps = rread(includedDir);
    // noinspection JSUnresolvedFunction
    resolveDeps.forEach(filename => {
        let fileContent = fs.readJsonSync(filename);
        for (let key in fileContent) {
            // noinspection JSUnfilteredForInLoop
            let path = fileContent[key];
            // noinspection JSUnfilteredForInLoop
            alias[key] = resolve(path);
        }
    });
}

module.exports = {
    resolve     : resolve,
    projectName : projectName,
    config      : {
        extensions : ['.js', '.vue', '.json'],
        alias      : alias,
    },
};
