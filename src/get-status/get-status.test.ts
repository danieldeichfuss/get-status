import {getStatus} from './get-status'
import {fetchChecks} from '../fetch-checks'
import checkSuites from '../../mocks/__fixtures__/check-suites.get.json'

jest.mock('../fetch-checks', () => ({
  fetchChecks: jest.fn()
}))

const ref = 'ref'
const token = 'token'

it('should return true if all checks completed', async () => {
  ;(fetchChecks as jest.Mock).mockResolvedValue(checkSuites)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})

it('should return false if not completed and not passed', async () => {
  const checkSuitesNotCompletedNotPassed = JSON.parse(
    JSON.stringify(checkSuites)
  )
  checkSuitesNotCompletedNotPassed.check_suites[0].status = 'queued'
  checkSuitesNotCompletedNotPassed.check_suites[0].conclusion = 'failure'
  ;(fetchChecks as any).mockResolvedValue(checkSuitesNotCompletedNotPassed)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: false,
    allChecksPassed: false
  })
})

it('should return false if not completed', async () => {
  const checkSuitesNotCompleted = JSON.parse(JSON.stringify(checkSuites))
  checkSuitesNotCompleted.check_suites[0].status = 'in_progress'
  ;(fetchChecks as any).mockResolvedValue(checkSuitesNotCompleted)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: false,
    allChecksPassed: true
  })
})

it('should return false if not passed', async () => {
  const checkSuitesNotPassed = JSON.parse(JSON.stringify(checkSuites))
  checkSuitesNotPassed.check_suites[0].conclusion = 'failed'
  ;(fetchChecks as any).mockResolvedValue(checkSuitesNotPassed)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: false
  })
})
