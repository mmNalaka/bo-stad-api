import { extendType } from '@nexus/schema'

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.user()
    t.crud.users()
  },
})
