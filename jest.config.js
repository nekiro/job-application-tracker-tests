module.exports = {
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/src/tests/**/*.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  clearMocks: true,
  setupFiles: ['dotenv/config'],
};
