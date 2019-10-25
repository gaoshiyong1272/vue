/* eslint-disable */
// noinspection NpmUsedModulesInstalled
require('eventsource-polyfill');
// noinspection NpmUsedModulesInstalled
let hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
