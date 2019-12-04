let args = process.argv.splice(2);
const path = require('path');
const config = require('../config');
const fs = require("fs");

/**
 * vue 加载root变量
 * @type {string}
 */
let rootStateload = "...mapState(['$md5', '$base64', '$page', '$config', '$lodash', '$helper', '$i18n', '$moment'])";



/**参数处理**/
let reg = /^(v=|sv=)[a-zA-Z\/]{3,}$/;
let parseArgsinfo = [];
let parseArgs = ()=>{
    let param = args[0];
    if(reg.test(param)){
        let arr = param.split('=');
        parseArgsinfo.push(arr[0], arr[1]);
        return true;
    }else {
        console.log('Pass params is error, example: v=index or m=index')
        return false;
    }
};

let mkdirsSync = dirname => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

let createVueFile = () =>{
    if(parseArgs()) {
        let components = config.getComponentsEntries();
        let subComponents = config.getSubComponentsEntries();
        let moduleType = parseArgsinfo[0];
        let moduleName = parseArgsinfo[1]

        /**创建vue文件**/
        if(moduleType === 'v') {
            if (!components[moduleName]) {

                /**有目录先创建目录**/
                let arr = moduleName.split('/');
                if (arr.length > 1) {
                    let pathArr = arr.slice(0, -1).join('/');
                    mkdirsSync(path.join(config.build.componentsDirectory, pathArr));
                }

                /**读取文件，并替换文件内容**/
                let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'vue-template.vue'));
                let content = String(buffer);
                content = content.replace(/@entryname@/g, moduleName);
                content = content.replace(/@rootStateLoad@/g, rootStateload);


                /**写文件**/
                let fd = fs.openSync(path.join(config.build.componentsDirectory, `${moduleName}.vue`), 'w');
                fs.writeFileSync(fd, content);
                fs.closeSync(fd);
                console.log('Created vue file is successfully ，Vue name is => ', moduleName, '\n')
            }else{
                console.log(moduleName + ' file already exist \n');
            }
        }

        /**创建子组件vue文件**/
        if(moduleType === 'sv'){
            if (!subComponents[moduleName]) {

                /**有目录先创建目录**/
                let arr = moduleName.split('/');
                if(arr.length > 1) {
                    let pathArr = arr.slice(0,-1).join('/');
                    mkdirsSync(path.join(config.build.subComponentsDirectory, pathArr));
                }

                /**读取文件，并替换文件内容**/
                let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'sub-vue-template.vue'));
                let content = String(buffer);
                content = content.replace(/@entryname@/g, `sub-${moduleName.replace(/\//g,'-')}`);
                content = content.replace(/@rootStateLoad@/g, rootStateload);

                /**写文件**/
                let fd = fs.openSync(path.join(config.build.subComponentsDirectory, `${moduleName}.vue`), 'w+');
                fs.writeFileSync(fd, content);
                fs.closeSync(fd);
                console.log('Created sub vue file is successfully ，sub vue name is => ', moduleName, '\n')
            }else{
                console.log(moduleName + ' file already exist \n');
            }
        }

    }
};

createVueFile();




