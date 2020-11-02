const path = require('path');

module.exports = {
    watch: true,
    devServer:{
        contentBase: './public',
        compress: true,
        hot: true,
        port: 3000
    },
    entry: {
        game: './public/GAME/javascript/entry.js',
        levels: './public/LEVELS/javascript/entry.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./public', 'dist')
    }
}