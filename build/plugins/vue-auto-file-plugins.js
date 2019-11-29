const path = require('path');
const config = require('../../config');
const fs = require("fs");

/**
 * 自动加载helper模块
 */
(function(){
    let helperImportStr = '';
    let helperExportStr = '';
    let count = 0;
    Object.keys(config.getHelpers()).forEach((helper) => {
        /**多层关系加载**/
        let moduleName = helper;
        let modulePath = helper;
        if(helper.indexOf('/') !==-1) {
            let temp = '';
            let arr = helper.split('/');
            let len = arr.length;
            for(let i =0 ; i< len; i++){
                if(i === 0) temp = arr[i];
                else temp += arr[i].replace(arr[i][0], arr[i][0].toLocaleUpperCase());
            }
            moduleName = temp;
        }

        let str = '';
        if(count === 0) {
            str = `import ${moduleName} from './${modulePath}';`;
            helperExportStr += `${moduleName}`;
        }else {
            str = `
import ${moduleName} from './${modulePath}';`;
            helperExportStr += `,
    ${moduleName}`;
        }
        helperImportStr += str;
        count++;

    });

    /**读取文件，并替换文件内容**/
    let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'auto-load-modules-template.txt'));
    let content = String(buffer);
    content = content.replace(/@import_modules@/g, helperImportStr);
    content = content.replace(/@modules_name@/g, helperExportStr);

    /**写文件**/
    let fd = fs.openSync(path.join(config.build.helperDirectory, 'autoload.js'), 'w');
    fs.writeFileSync(fd, content);
    fs.closeSync(fd);
    console.log('create hepler autoload.js=> ', path.join(config.build.helperDirectory, 'autoload.js'));
    console.log(helperImportStr, helperExportStr)
})();



/**
 * 根据components文件夹根目录vue文件生成Entry如何文件
 */
Object.keys(config.getComponentsEntries()).forEach((componentEntry) => {
    componentEntry = componentEntry.toLocaleLowerCase();
    let entry = config.getEntries();

    /**无Entry文件自动生产Entry入口文件**/
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
