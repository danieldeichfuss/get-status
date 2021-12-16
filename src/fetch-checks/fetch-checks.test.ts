import checkSuites from '../../mocks/__fixtures__/check-suites.get.json'
import {fetchChecks} from './fetch-checks'

it.skip('should fetch checks', async () => {
  const result = await fetchChecks({ref: '1234567', token: 'token'})

  expect(result).toEqual(checkSuites)
})
