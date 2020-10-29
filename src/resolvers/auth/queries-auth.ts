import { extendType } from '@nexus/schema'

export const AuthQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.authToken()
    t.crud.authTokens()
  },
})
