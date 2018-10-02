module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    },
  },
  rules: {
    'import/no-webpack-loader-syntax': ['off'],
    'import/no-duplicates': ['off'],
  },
};
