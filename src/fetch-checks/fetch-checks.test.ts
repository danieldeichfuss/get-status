import checkRuns from '../../mocks/__fixtures__/check-runs.get.json'
import {fetchChecks} from './fetch-checks'
import github from '@actions/github'

jest.mock('@actions/github')
jest.spyOn(console, 'error').mockImplementation(() => undefined)

const githubMock = {
  context: {
    repo: {
      owner: '',
      repo: ''
    }
  }
}

beforeEach(() => {
  ;(github as any) = githubMock
})

it('should fetch checks', async () => {
  ;(github as any) = {
    ...githubMock,
    getOctokit: () => ({
      rest: {
        checks: {
          listForRef: jest.fn().mockResolvedValue({data: checkRuns})
        }
      }
    })
  }

  const result = await fetchChecks({ref: '1234567', token: 'token'})

  expect(result).toEqual(checkRuns)
})

it('should log the error', async () => {
  ;(github as any) = {
    ...githubMock,
    getOctokit: () => ({
      rest: {
        checks: {
          listForRef: jest
            .fn()
            .mockRejectedValue(new Error('something went wrong'))
        }
      }
    })
  }

  await fetchChecks({ref: '1234567', token: 'token'})

  expect(console.error).toHaveBeenCalledWith(new Error('something went wrong'))
})
