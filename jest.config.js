module.exports = {
  preset: 'ts-jest',
  // REFERENCE: https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios
  moduleNameMapper: {
    "axios": require.resolve("axios"),
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/core/*', 'src/repositories/*', 'src/requests/*', 'src/scrollers/*'],
  coveragePathIgnorePatterns: ['index.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
