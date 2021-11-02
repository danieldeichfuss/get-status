const {rest} = require('msw')
const allChecksPassed = require('./__fixtures__/all-checks-passed.json')

exports.handlers = [
  rest.get('*/check-suites', (req, res, ctx) => {
    const pathParts = req.url.pathname.split('/')
    const commitRef = pathParts[pathParts.length - 2]

    // TODO: if commitRef === all-checks-passed | only-checks-complete | only-checks-passed | no-checks-passed

    return res(ctx.json(allChecksPassed))
  }),
  rest.get('*', (req, res, ctx) => {
    console.log('*', req.method, req.url)
    return res(ctx.status(200))
  })
]
