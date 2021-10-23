import {it} from '@jest/globals'
import {fetchChecks} from './fetch-checks'

it('should fetch checks', async () => {
  await fetchChecks({ref: '1234567', token: 'token'})
})
