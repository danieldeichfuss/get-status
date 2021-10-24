import {ActionInput, ActionOutput} from '../types'

export function getStatus({ref, token}: ActionInput): ActionOutput {
  return {
    allChecksCompleted: true,
    allChecksPassed: true
  }
}
