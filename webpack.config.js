var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


module.exports = {
    context: __dirname,
    entry: './assets/js/index',
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: 'app.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                      typescript: 'ts-loader',
                      less: 'vue-style-loader!css-loader!less-loader'
                    }
                  }
            }
        ],
    },
    resolve: {
        alias: {vue: 'vue/dist/vue.js'}
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'})
    ],

};
