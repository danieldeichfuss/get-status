/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable filenames/match-regex */

process.env['GITHUB_REPOSITORY'] = 'danieldeichfuss/get-status'
process.env['INPUT_TOKEN'] = '12345'
process.env['INPUT_REF'] = '12345'

const {server} = require('./mocks/server.js')
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
