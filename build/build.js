require('./check-versions')();
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');

const argv = function (args) {
    let result = require('minimist')(args, {
        boolean : ['p', 'w', 'l'],
        default : {l : false, p : false, w : false},
        alias   : {
            'p' : ['production', 'prod', 'release'],
            'w' : ['watch'],
            'l' : ['lib', 'library', 'pack'],
        },
        unknown : () => false,
    });
    if (result.l) result.p = true;
    
    return result;
}(process.argv.slice(2));

const isDebug = !argv.p;
process.env.NODE_ENV = isDebug ? 'development' : 'production';

let config = require('../config');
config.setDebug(isDebug);

const webpackConfigFile = argv.l
                          ? './webpack.lib.conf' // build as library
                          : (
                              isDebug
                              ? './webpack.dev.conf' // build for development env
                              : './webpack.prod.conf' // build as production release
                          );
const webpackConfig = require(webpackConfigFile);
webpackConfig['watch'] = argv.w;


let spinner = ora(`building for ${process.env.NODE_ENV}...`);
spinner.start();

webpack(
    webpackConfig,
    function (err, stats) {
        spinner.stop();
        if (err) throw err;
        let format = {
            colors       : true,
            modules      : false,
            children     : false,
            chunks       : false,
            chunkModules : false,
        };
        // noinspection JSCheckFunctionSignatures
        process.stdout.write(stats.toString(format) + '\n\n');
        
        if (stats.hasErrors()) {
            // noinspection JSUnresolvedFunction
            console.log(chalk.red('  Build failed with errors.\n'));
            process.exit(1);
        }
        
        // noinspection JSUnresolvedFunction
        console.log(chalk.cyan('  Build complete.\n'));
        // noinspection JSUnresolvedFunction
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ));
    }
);
