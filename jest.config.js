module.exports = {
  testEnvironment: 'jest-environment-node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  clearMocks: true,
  setupFiles: ['dotenv/config'],
};
