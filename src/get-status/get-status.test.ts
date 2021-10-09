import {getStatus} from './get-status'
import {it, expect} from '@jest/globals'

it('should return true if all checks completed', () => {
  const ref = '12345'

  expect(getStatus(ref)).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})
