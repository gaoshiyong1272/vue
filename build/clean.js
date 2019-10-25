require('./check-versions')();
const fs = require('fs-extra');
const config = require('../config');
const resolveConfig = require('./resolve.conf');

let dir = resolveConfig.resolve(config.build.buildOutputRoot);
fs.emptyDirSync(dir);

console.log("Directory " + dir + " cleaned");
