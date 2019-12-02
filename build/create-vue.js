let args = process.argv.splice(2);
const path = require('path');
const config = require('../config');
const fs = require("fs");



/**参数处理**/
let reg = /^(v=|m=)[a-zA-Z]{3,}$/;
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


let createVueFile = () =>{
    if(parseArgs()) {
        let components = config.getComponentsEntries();
        let moduleType = parseArgsinfo[0];
        let moduleName = parseArgsinfo[1]

        /**创建vue文件**/
        if(moduleType === 'v') {
            if (!components[moduleName]) {
                /**读取文件，并替换文件内容**/
                let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'vue-templage.vue'));
                let content = String(buffer);
                content = content.replace(/@entryname@/g, moduleName);

                /**写文件**/
                let fd = fs.openSync(path.join(config.build.componentsDirectory, `${moduleName}.vue`), 'w');
                fs.writeFileSync(fd, content);
                fs.closeSync(fd);
                console.log('Vue created，Vue name=> ', moduleName)
            }

            /**生成其他关系**/
            // require('./plugins/vue-auto-file-plugins');
            //
            // let port = process.env.PORT || config.build.port;
            // let app = express();
            // let server = app.listen(port);
            //
            // let pat = `cd ${__dirname}`;
            // pat = pat.replace(/\//g, '//');
            // let cmd = `${pat} && cd ../ && npm run dev`;
            // console.log(cmd);
            // server.close();
            // exec(cmd, function (error, stdout, stderr) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log("重启成功");
            //     }
            // });
        }

    }
};

createVueFile();




