import * as core from '@actions/core'
import checkRuns from '../../mocks/__fixtures__/check-runs.get.json'
import {fetchChecks} from './fetch-checks'
import {getOctokit, context} from '@actions/github'

jest.mock('@actions/github')
jest.mock('@actions/core')

beforeAll(() => {
  ;(context as any) = {
    repo: {
      owner: '',
      repo: ''
    }
  }
})

it('should fetch checks', async () => {
  ;(getOctokit as any) = () => ({
    rest: {
      checks: {
        listForRef: jest.fn().mockResolvedValue({data: checkRuns})
      }
    }
  })

  const result = await fetchChecks({ref: '1234567', token: 'token'})

  expect(result).toEqual(checkRuns)
})

it('should log the error', async () => {
  ;(getOctokit as any) = () => ({
    rest: {
      checks: {
        listForRef: jest
          .fn()
          .mockRejectedValue(new Error('something went wrong'))
      }
    }
  })

  await fetchChecks({ref: '1234567', token: 'token'})

  expect(core.error).toHaveBeenCalledWith(new Error('something went wrong'))
})
