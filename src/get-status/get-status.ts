import {ActionInput, ActionOutput} from '../types'
import {fetchChecks} from '../fetch-checks'

export async function getStatus({
  ref,
  token
}: ActionInput): Promise<ActionOutput> {
  const checks = await fetchChecks({ref, token})
  const checkSuites = checks?.check_suites

  const allChecksCompleted =
    checkSuites?.every(checkSuite => {
      checkSuite.status === 'completed'
    }) || false

  const allChecksPassed =
    checkSuites?.every(checkSuite => {
      checkSuite.conclusion === 'success' || 'neutral' || 'skipped'
    }) || false

  return {
    allChecksCompleted,
    allChecksPassed
  }
}
