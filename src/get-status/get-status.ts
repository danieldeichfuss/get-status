import {ActionInput, ActionOutput} from '../types'
import {fetchChecks} from '../fetch-checks'

export async function getStatus({
  ref,
  token
}: ActionInput): Promise<ActionOutput> {
  const checksResponse = await fetchChecks({ref, token})
  const checkSuites = checksResponse?.data.check_suites

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
