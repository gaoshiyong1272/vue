require('./check-versions')();
const fs = require('fs-extra');
const resolveConfig = require('./resolve.conf');

let parentProjectDir = resolveConfig.resolve(resolveConfig.projectName.startsWith("@") ? '../../..' : '../..');
let inHomeDir = !(fs.pathExistsSync(parentProjectDir + "/node_modules"));
let resolves = {};

if (inHomeDir) {
    console.log("Will update self resolve dependency file ...");
    depFilePath = resolveConfig.resolve('build/resolve-deps/' + resolveConfig.projectName + '.json');
    resolves[resolveConfig.projectName] = resolveConfig.projectName;
    resolves.assets = resolveConfig.projectName + "/assets";
}
else {
    let transformToRequireFilePath = resolveConfig.resolve('config/transform-settings.json');
    if (fs.existsSync(transformToRequireFilePath)) {
        console.log("Will generate transform to require file ...");
        let targetTransformToRequireFilePath = parentProjectDir + '/build/custom-transform-to-require-settings/' + resolveConfig.projectName + '.json';
        fs.copySync(transformToRequireFilePath, targetTransformToRequireFilePath);
        console.log("Custom transform to require file copied");
    }
    
    console.log("Will generate resolve dependency file ...");
    depFilePath = parentProjectDir + '/build/resolve-deps/' + resolveConfig.projectName + '.json';
    resolves[resolveConfig.projectName + '$'] = "node_modules/" + resolveConfig.projectName + "/" + resolveConfig.projectName + "/publish.js";
    resolves[resolveConfig.projectName + "/" + resolveConfig.projectName] = "node_modules/" + resolveConfig.projectName + "/" + resolveConfig.projectName;
    resolves[resolveConfig.projectName] = "node_modules/" + resolveConfig.projectName + "/" + resolveConfig.projectName;
    
    console.log("Will generate copy-file-setting file ...");
    settingFilePath = parentProjectDir + '/build/copy-file-settings/' + resolveConfig.projectName + '.json';
    fs.outputJsonSync(
        settingFilePath,
        {
            module  : resolveConfig.projectName,
            from    : "dist",
            ignores : [".*"],
        },
        {spaces : 4}
    );
}

fs.outputJsonSync(
    depFilePath,
    resolves,
    {spaces : 4}
);
console.log("Resolve dependency file updated for " + resolveConfig.projectName);
