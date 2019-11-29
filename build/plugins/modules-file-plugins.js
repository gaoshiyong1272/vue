const path = require('path');
const config = require('../../config');
const fs = require("fs")

//create entries file js
Object.keys(config.getComponentsEntries()).forEach((componentEntry) => {
    componentEntry = componentEntry.toLocaleLowerCase();
    let entry = config.getEntries();

    /**
     * 无Entry文件自动生产Entry入口文件
     */
    if (!entry[componentEntry]) {
        /**读取文件，并替换文件内容**/
        let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'entry-js-template.js'));
        let content = String(buffer);
        content = content.replace(/@entryname@/g, componentEntry);

        /**写文件**/
        let fd = fs.openSync(path.join(config.build.entryDirectory, `${componentEntry}.js`), 'w');
        fs.writeFileSync(fd, content);
        fs.closeSync(fd);

        console.log('create entries=> ', componentEntry)
    }

});

module.exports = [];
