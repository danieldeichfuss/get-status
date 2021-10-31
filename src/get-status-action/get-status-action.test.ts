import {getStatusAction} from './get-status-action'
import {getStatus} from '../get-status'
import * as core from '@actions/core'

jest.mock('../get-status')

jest.mock('@actions/core', () => {
  return {
    getInput: jest.fn().mockImplementation(input => input),
    setOutput: jest.fn(),
    setFailed: jest.fn()
  }
})

it('should get the inputs for the action', () => {
  getStatusAction()

  expect(core.getInput).toHaveBeenCalledWith('ref')
  expect(core.getInput).toHaveBeenCalledWith('token')
})

it('should call getStatus with the inputs', () => {
  getStatusAction()

  expect(getStatus).toHaveBeenCalledWith({
    ref: 'ref',
    token: 'token'
  })
})

it('should set the action output', () => {
  ;(getStatus as jest.Mock).mockReturnValue({
    allChecksCompleted: true,
    allChecksPassed: true
  })

  getStatusAction()

  expect(core.setOutput).toHaveBeenCalledWith('all-checks-completed', true)
  expect(core.setOutput).toHaveBeenCalledWith('all-checks-passed', true)
})

it('should set the action to failed', () => {
  const errorMessage = 'test error'

  ;(getStatus as jest.Mock).mockImplementation(() => {
    throw new Error(errorMessage)
  })

  getStatusAction()

  expect(core.setFailed).toHaveBeenCalledWith(errorMessage)
})
