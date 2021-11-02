import {getStatus} from './get-status'
import {fetchChecks} from '../fetch-checks'

const ref = 'ref'
const token = 'token'

it('should return true if all checks completed', async () => {
  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})

it('should return false if not all checks completed', async () => {
  ;(fetchChecks as jest.Mock).mockResolvedValue({
    data: {
      check_suits: [{}]
    }
  })
  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: false,
    allChecksPassed: false
  })
})
