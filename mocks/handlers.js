const {rest} = require('msw')
const getCheckRuns = require('./__fixtures__/check-runs.get.json')

exports.handlers = [
  rest.get('*/check-suites', (req, res, ctx) => {
    return res(ctx.json(getCheckRuns))
  }),
  rest.get('*', (req, res, ctx) => {
    console.log('*', req.method, req.url)
    return res(ctx.status(200))
  })
]
