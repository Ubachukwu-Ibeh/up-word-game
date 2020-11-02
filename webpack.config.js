const path = require('path');

module.exports = {
    watch: true,
    mode: 'development',
    devServer: {
        open: true,
        contentBase: './public',
        compress: true,
        hot: true,
        port: 3000,
        publicPath: './public'
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