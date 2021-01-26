module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.vue',
    '!src/main.js',
    '!src/App.vue',
    '!src/api/**',
    '!src/components-v1/**',
    '!src/router/**',
    '!**/node_modules/**',
  ],
};
