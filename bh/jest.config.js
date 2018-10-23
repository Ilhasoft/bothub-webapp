module.exports = {
  rootDir: __dirname,
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  transform: {
    '.*\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.vue$': '<rootDir>/node_modules/vue-jest',
  },
  moduleNameMapper: {
    '.*\\.svg$': '<rootDir>/__mocks__/fileMock.js',
  },
};
