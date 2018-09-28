const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'development',
  entry: {
    bh: './src/index.js',
  },
  output: {
    library: 'bh',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'),
      '@scss': resolve('src/assets/scss'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
