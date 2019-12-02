const path = require('path');
const config = require('../../config');
const fs = require("fs");
const autoload = require('../autoload');

/**自执行**/
(function(){
    autoload.helper();
    autoload.entrys();
    autoload.modules();
})();

module.exports = [];
