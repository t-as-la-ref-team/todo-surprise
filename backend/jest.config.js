module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  testPathIgnorePatterns: ["/node_modules/", "/tests/performance.test.js"],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "/controllers/",
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};