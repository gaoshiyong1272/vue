// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root          : true,
    parser        : 'babel-eslint',
    parserOptions : {
        sourceType : 'module',
    },
    env           : {
        browser : true,
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends       : 'standard',
    // required to lint *.vue files
    plugins       : [
        'html',
    ],
    // add your custom rules here
    'rules'       : {
        'semi'                        : [2, "always", {"omitLastInOneLineBlock" : false}],
        'comma-dangle'                : [2, 'only-multiline'],
        // allow paren-less arrow functions
        'arrow-parens'                : 0,
        // allow async-await
        'generator-star-spacing'      : 0,
        // allow debugger during development
        'no-debugger'                 : process.env.NODE_ENV === 'production' ? 2 : 0,
        'key-spacing'                 : 0,
        'space-before-function-paren' : 0,
        'indent'                      : [2, 4, {SwitchCase : 1}],
        'no-unused-vars'              : 0,
        'quotes'                      : 0,
        'no-trailing-spaces'          : 0,
        'no-multi-spaces'             : 0,
        'brace-style'                 : [2, 'stroustrup'],
        'padded-blocks'               : 0,
        'one-var'                     : 0,
    },
};
