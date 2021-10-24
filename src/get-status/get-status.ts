import {ActionInput, ActionOutput} from '../types'

export function getStatus({ref, token}: ActionInput): ActionOutput {
  console.log({ref, token})

  return {
    allChecksCompleted: true,
    allChecksPassed: true
  }
}
