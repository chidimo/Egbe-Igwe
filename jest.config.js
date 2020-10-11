// eslint-disable-next-line no-undef
module.exports = {
  testTimeout: 50000,
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  transform: {'^.+\\.jsx?$': 'babel-jest'},
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFiles: ['<rootDir>/__setupFiles__/Components.js'],
  moduleDirectories: ['node_modules', 'src'],
};
