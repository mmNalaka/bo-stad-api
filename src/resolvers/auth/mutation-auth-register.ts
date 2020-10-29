import { arg, inputObjectType, mutationField } from '@nexus/schema'
import isEmail from 'validator/lib/isEmail'
import { throwUserInputError } from '../../utils/graphql-errors'

export const AuthRegisterInput = inputObjectType({
  name: 'AuthRegisterInput',
  nonNullDefaults: { input: true },
  definition(t) {
    t.string('email')
    t.string('password')
    t.boolean('longLived', { nullable: true })
  },
})

export const RegisterMutation = mutationField('register', {
  type: 'AuthPayload',
  args: {
    data: arg({ type: 'AuthRegisterInput', nullable: false }),
  },
  resolve: async (_root, args, ctx) => {
    if (!isEmail(args.data.email))
      throwUserInputError('INVALID_EMAIL_INPUT', args.data.email)
    return {}
  },
})
