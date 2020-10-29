import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.status()
    t.model.email()
    t.model.password()
    t.model.locale()
    t.model.emailVerifiedAt()
    t.model.firstName()
    t.model.lastName()
    t.model.lastLogged()
    t.model.authTokens()
  },
})
