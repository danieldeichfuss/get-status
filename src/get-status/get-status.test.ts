import {getStatus} from './get-status'
import {fetchChecks} from '../fetch-checks'
import checkRuns from '../../mocks/__fixtures__/check-runs.get.json'

jest.mock('../fetch-checks', () => ({
  fetchChecks: jest.fn()
}))

const ref = 'ref'
const token = 'token'

it('should return true if all checks completed', async () => {
  ;(fetchChecks as jest.Mock).mockResolvedValue(checkRuns)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})

it('should return true if only ignored checks are failing', async () => {
  const checkRunsNotCompletedNotPassed = JSON.parse(JSON.stringify(checkRuns))
  checkRunsNotCompletedNotPassed.check_runs[0].status = 'queued'
  checkRunsNotCompletedNotPassed.check_runs[0].conclusion = 'failure'
  checkRunsNotCompletedNotPassed.check_runs[0].name = 'ignore-me'
  ;(fetchChecks as any).mockResolvedValue(checkRunsNotCompletedNotPassed)

  expect(await getStatus({ref, token, ignore: ['ignore-me']})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})

it('should return true if current check run is the only check run', async () => {
  const onlyOneCheckRun = JSON.parse(JSON.stringify(checkRuns))
  onlyOneCheckRun.check_runs[0].name = 'get-status'
  ;(fetchChecks as any).mockResolvedValue(onlyOneCheckRun)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})

it('should return false if not completed and not passed', async () => {
  const checkRunsNotCompletedNotPassed = JSON.parse(JSON.stringify(checkRuns))
  checkRunsNotCompletedNotPassed.check_runs[0].status = 'queued'
  checkRunsNotCompletedNotPassed.check_runs[0].conclusion = 'failure'
  ;(fetchChecks as any).mockResolvedValue(checkRunsNotCompletedNotPassed)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: false,
    allChecksPassed: false
  })
})

it('should return false if not completed', async () => {
  const checkRunsNotCompleted = JSON.parse(JSON.stringify(checkRuns))
  checkRunsNotCompleted.check_runs[0].status = 'in_progress'
  ;(fetchChecks as any).mockResolvedValue(checkRunsNotCompleted)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: false,
    allChecksPassed: true
  })
})

it('should return false if not passed', async () => {
  const checkRunsNotPassed = JSON.parse(JSON.stringify(checkRuns))
  checkRunsNotPassed.check_runs[0].conclusion = 'failed'
  ;(fetchChecks as any).mockResolvedValue(checkRunsNotPassed)

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: true,
    allChecksPassed: false
  })
})

it('should return false if check runs could not be fetched', async () => {
  ;(fetchChecks as any).mockResolvedValue()

  expect(await getStatus({ref, token})).toEqual({
    allChecksCompleted: false,
    allChecksPassed: false
  })
})
