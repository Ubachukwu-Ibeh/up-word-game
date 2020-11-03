const path = require('path');

module.exports = {
    entry: {
        game: './public/GAME/javascript/entry.js',
        levels: './public/LEVELS/javascript/entry.js',
        home: './public/HOME/javascript/entry.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./public', 'dist')
    }
}