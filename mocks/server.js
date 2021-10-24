const {handlers} = require('./handlers')
const {setupServer} = require('msw/node')

exports.server = setupServer(...handlers)
