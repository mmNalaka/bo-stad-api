import { extendType } from '@nexus/schema'

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneUser()
    t.crud.updateOneUser()
    t.crud.deleteOneUser()
  },
})
