const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        game: './public/GAME/javascript/entry.js',
        levels: './public/LEVELS/javascript/entry.js',
        home: './public/HOME/javascript/entry.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./public', 'dist')
    },
    plugins:[
        new WorkboxPlugin.GenerateSW()
    ],
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader',
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
              'file-loader',
            ],
          },
          {
            test: /\.(mp3|wav)$/,
            use: [
                'file-loader',
            ]
        }
        ],
    },
}