const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'test.js'),

    output:{
        filename:'build.js',

    },
    mode : 'production'
}