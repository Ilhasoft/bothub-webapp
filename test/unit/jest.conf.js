const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '.*\\.(svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^bh$': '<rootDir>/src/bh',
    '^bh/(.*)$': '<rootDir>/src/bh/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    'src/bh/*/**/*.vue',
    'src/components-v1/*/**/*.vue',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
};
