import {getStatus} from './get-status'
import {fetchChecks} from '../fetch-checks'

  const ref = 'ref'
  const token = 'token'

  expect(getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})
