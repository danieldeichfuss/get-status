import {getStatus} from './get-status'
import {it, expect} from '@jest/globals'

it('should return true if all checks completed', () => {
  const ref = 'ref'
  const token = 'token'

  expect(getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})
