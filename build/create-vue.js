console.log('111111');
const argparse = require('argparse');

const parser = new argparse.ArgumentParser({
    version: '1.0.0',
    description: 'CLI client for Socket.IO.'
});
parser.addArgument(
    ['-i', '--interval'], {
        help: 'Time interval for sending message in seconds.',
        defaultValue: 10,
        type: 'int'
    }
);
parser.addArgument(
    ['-n', '--num-thread'], {
        help: 'Number of threads for sending messages.',
        defaultValue: 1,
        type: 'int'
    }
);
parser.addArgument('target', {
    metavar: 'TARGET',
    nargs: 1,
    help: 'URL of Socket.IO server.'
});
const args = parser.parseArgs();

