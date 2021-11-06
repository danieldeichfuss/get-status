module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  coveragePathIgnorePatterns: ['/mocks/*']
}
