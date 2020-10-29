import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import { genSaltSync, hash, compare } from 'bcryptjs'

import { Context } from '../context'
import { createError } from './graphql-errors'
import { AuthClient, AuthToken, User } from '../../db'
import { config } from '../config/index'

export const checkForValidAuthClient = async (id: string, ctx: Context) => {
  const client = await ctx.db.authClient.findOne({ where: { id } })
  if (!client || client.revoked) {
    createError('AUTH.INVALID.CLIENT')
  }
  return client
}

export const checkForUniqueUser = async (email: string, ctx: Context) => {
  if (!isEmail(email)) {
    createError('AUTH.INVALID.EMAIL.INPUT')
  }

  const existingUser = await ctx.db.user.findOne({ where: { email } })
  if (existingUser) {
    createError('AUTH.EMAIL.INUSE')
  }
}

export const checkUserAndGetUser = async (email: string, ctx: Context) => {
  const user = await ctx.db.user.findOne({
    where: { email },
    include: {
      authTokens: {
        where: {
          revoked: false,
        },
      },
      authClients: true,
    },
  })

  if (!user) {
    createError('AUTH.INVALID.CREDENTIALS')
  }

  return user
}

export const connectAuthClientToUser = async (
  client: AuthClient,
  user: any,
  ctx: Context,
) => {
  const linkedClients = user?.authClients || []
  const match = linkedClients.find(
    (linkedClient: AuthClient) => linkedClient.id === client.id,
  )

  if (!match) {
    await ctx.db.user.update({
      where: { id: user.id },
      data: {
        authClients: {
          connect: {
            id: client.id,
          },
        },
      },
    })
  }
}

export const createPasswordHash = async (password: string) => {
  return hash(password, genSaltSync(10))
}

export const comparePassword = async (password: string, hash: string = '') => {
  const validPassword = await compare(password, hash)
}

export const createAccessToken = (user: User, client: AuthClient) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const expiry =
    currentTime + (client.expiryDuration || config.accessTokenExpiryDuration)

  const secret = client.secret || config.accessTokenSecret
  const tokenData = {
    exp: expiry,
    data: {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      userType: user.userType,
      permissions: [],
    },
  }

  return jwt.sign(tokenData, secret)
}

export const createRefreshToken = (
  user: User,
  authToken: AuthToken,
  client: AuthClient,
) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const expiry = currentTime + config.refreshTokenExpiryDuration

  const secret = client.secret || config.refreshTokenSecret

  const tokenData = {
    exp: expiry,
    data: {
      userId: user.id,
      tokenId: authToken.id,
      clientId: client.id,
    },
  }

  return jwt.sign(tokenData, secret)
}

export const decodeAndCreateAccessToken = async (
  token: string,
  ctx: Context,
) => {
  const decodedToken: any = jwt.decode(token)
  let client: AuthClient | null = null

  if (decodedToken.data.clientId) {
    client = await ctx.db.authClient.findOne({
      where: { id: decodedToken.data.clientId },
    })
  }

  if (!client || client.revoked) {
    createError('SERVER.UNAUTHORIZED')
  }

  try {
    jwt.verify(token, client?.secret || '')
  } catch (err) {
    createError('SERVER.UNAUTHORIZED')
  }

  const user = await ctx.db.user.findOne({
    where: {
      id: decodedToken.data.userId,
    },
  })

  if (user && client) {
    return {
      accessToken: createAccessToken(user, client),
      expiresIn: client.expiryDuration || config.accessTokenExpiryDuration,
    }
  }
}
