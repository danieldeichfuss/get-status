import {getStatusAction} from './get-status-action'
import {it, expect, jest} from '@jest/globals'
import {getStatus} from '../get-status'

jest.mock('../get-status')
process.env['INPUT_TOKEN'] = 'token'
process.env['INPUT_REF'] = 'ref'

it('should get the inputs for the action', () => {})

it('should call getStatus with the inputs', () => {
  getStatusAction()

  expect(getStatus).toHaveBeenCalledWith({
    ref: 'ref',
    token: 'token'
  })
})

it('should set the action output', () => {})

it('should set the action to failed', () => {})
