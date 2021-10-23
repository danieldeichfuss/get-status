const {rest} = require('msw')

exports.handlers = [
  rest.get('*/check-suites', (req, res, ctx) => {
    console.log(req.method, req.url)

    return res(ctx.status(200))
  }),
  rest.get('*', (req, res, ctx) => {
    console.log(req.method, req.url)
    return res(ctx.status(200))
  })
]
