export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/unit/**/*.test.js'],
  collectCoverageFrom: [
    'frontend/js/**/*.js',
    '!frontend/js/firebase.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};