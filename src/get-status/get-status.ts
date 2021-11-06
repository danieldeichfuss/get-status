import {ActionInput, ActionOutput} from '../types'
import {fetchChecks} from '../fetch-checks'

export async function getStatus({
  ref,
  token
}: ActionInput): Promise<ActionOutput> {
  const checks = await fetchChecks({ref, token})
  const checkSuites = checks?.check_suites

  const allChecksCompleted = checkSuites?.every(checkSuite => {
    return checkSuite.status === 'completed'
  })

  const allChecksPassed = checkSuites?.every(checkSuite => {
    return (
      checkSuite.conclusion === 'success' ||
      checkSuite.conclusion === 'neutral' ||
      checkSuite.conclusion === 'skipped'
    )
  })

  return {
    allChecksCompleted: allChecksCompleted || false,
    allChecksPassed: allChecksPassed || false
  }
}
