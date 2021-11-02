const {rest} = require('msw')
const getCheckSuites = require('./__fixtures__/check-suites.get.json')

exports.handlers = [
  rest.get('*/check-suites', (req, res, ctx) => {
    return res(ctx.json(getCheckSuites))
  }),
  rest.get('*', (req, res, ctx) => {
    console.log('*', req.method, req.url)
    return res(ctx.status(200))
  })
]
