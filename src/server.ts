import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { applyMiddleware } from 'graphql-middleware'

import { graphqlSchema } from './schema'
import { createContext } from './context'

const graphqlServer = new ApolloServer({
  validationRules: [],
  schema: applyMiddleware(graphqlSchema),
  context: createContext,
})

export const createServer = async () => {
  const app = express()

  app.use(bodyParser.json())
  graphqlServer.applyMiddleware({ app })

  return {
    app,
    graphqlPath: graphqlServer.graphqlPath,
  }
}
