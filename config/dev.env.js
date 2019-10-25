const merge = require('webpack-merge');
let prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV : '"development"',
    // add bridge object here for debug env
    // NOTE: bridge object must be JSON.stringified because webpack will simply string-replace the occurence
    bridge   : JSON.stringify({
        name : "feixiong",
    }),
});
