const path = require('path');

module.exports = {
    watch: true,
    mode: 'development',
    entry: {
        game: './public/GAME/javascript/entry.js',
        levels: './public/LEVELS/javascript/entry.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./public', 'dist')
    }
}