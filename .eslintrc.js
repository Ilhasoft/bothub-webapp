module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'] // default @ -> ./src alias in Vue, it
          // exists even if vue.config.js is not present
          /*
          *... add your own webpack aliases if you have them in
          vue.config.js/other webpack config file
          * if you forget to add them, eslint-plugin-import
          will not throw linting error in .vue
          * imports that contain the webpack alias you forgot to add
          */
        ],
        extensions: ['.vue', '.json', '.js']
      }
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'import/no-cycle': 'off',
    'arrow-parens': 'off',
    'import/order': 'off',
    'vue/no-unused-components': 'off',
    'no-unused-vars': 'off',
    'import/no-unresolved': 'off',
    'space-before-blocks': 'off',
    'object-curly-newline': 'off',
    'no-plusplus': 0,
    'comma-dangle': 'off',
    "linebreak-style": 0,
    semi: 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-multiple-empty-lines': [2, { max: 2 }],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js']
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
