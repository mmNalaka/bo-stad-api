import { inputObjectType, objectType } from '@nexus/schema'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.int('expiresIn')
    t.field('user', { type: 'User' })
  },
})

export const AuthToken = objectType({
  name: 'AuthToken',
  definition: (t) => {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.revoked()
    t.model.expiration()
    t.model.userId()
  },
})
