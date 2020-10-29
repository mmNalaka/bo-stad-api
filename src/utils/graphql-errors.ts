import {
  AuthenticationError,
  UserInputError,
  ValidationError,
  ApolloError,
} from 'apollo-server-express'

const authenticationErrors = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_EXIST: 'EMAIL_EXIST',
}

const userInputErrors = {
  INVALID_EMAIL_INPUT: 'INVALID_EMAIL_INPUT',
}

const validationErrors = {
  INVALID_INPUT: 'INVALID_INPUT',
}
const serverErrors = {
  SERVER_ERROR: 'SERVER_ERROR',
}

const dataToString = (data: string | any = '') =>
  typeof data === 'string' ? data : JSON.stringify(data, null, 1)

export const throwValidationError = (
  code: keyof typeof validationErrors,
  data?: string | object,
) => {
  throw new ValidationError(`${code}: ${dataToString(data)}`)
}

export const throwUserInputError = (
  code: keyof typeof userInputErrors,
  data?: string | object,
) => {
  throw new UserInputError(`${code}: ${dataToString(data)}`)
}

export const throwAuthenticationError = (
  code: keyof typeof authenticationErrors,
  data?: string | object,
) => {
  throw new AuthenticationError(`${code}: ${dataToString(data)}`)
}

export const throwServerError = (
  code: keyof typeof serverErrors,
  data?: string | object,
) => {
  throw new ApolloError(`${code}: ${dataToString(data)}`)
}
