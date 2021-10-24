import {getStatusAction} from './get-status-action'
import {it, expect, jest} from '@jest/globals'

it('should get the inputs for the action', () => {
  expect(getStatusAction()).toEqual({
    allChecksCompleted: true,
    allChecksPassed: true
  })
})

it('should call getStatus with the inputs', () => {})

it('should set the action output', () => {})

it('should set the action to failed', () => {})
