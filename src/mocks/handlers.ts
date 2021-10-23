import {rest} from 'msw'

export const handlers = [
  rest.get('*/check-suites*', (req, res, ctx) => {
    return res(ctx.status(200))
  })
]
