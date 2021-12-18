import {getStatusAction} from './get-status-action'
import {getStatus} from '../get-status'
import * as core from '@actions/core'

jest.mock('../get-status')

jest.mock('@actions/core', () => {
  return {
    getInput: jest.fn().mockImplementation(input => input),
    setOutput: jest.fn(),
    setFailed: jest.fn(),
    info: jest.fn()
  }
})

it('should get the inputs for the action', async () => {
  await getStatusAction()

  expect(core.getInput).toHaveBeenCalledWith('ref')
  expect(core.getInput).toHaveBeenCalledWith('token')
  expect(core.getInput).toHaveBeenCalledWith('ignore')
})

it('should call getStatus with the inputs', async () => {
  await getStatusAction()

  expect(getStatus).toHaveBeenCalledWith({
    ref: 'ref',
    token: 'token',
    ignore: ['ignore']
  })
})

it('should set the action output', async () => {
  ;(getStatus as jest.Mock).mockResolvedValue({
    allChecksCompleted: true,
    allChecksPassed: true
  })

  await getStatusAction()

  expect(core.setOutput).toHaveBeenCalledWith('all-checks-completed', true)
  expect(core.setOutput).toHaveBeenCalledWith('all-checks-passed', true)
})

it('should set the action to failed', async () => {
  const errorMessage = 'test error'

  ;(getStatus as jest.Mock).mockImplementation(() => {
    throw new Error(errorMessage)
  })

  await getStatusAction()

  expect(core.setFailed).toHaveBeenCalledWith(errorMessage)
})
