import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import * as resolvers from '../resolvers'
import * as types from '../models'

export const graphqlSchema = makeSchema({
  types: {
    types,
    resolvers,
  },
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    schema: __dirname + '/../generated/schema.graphql',
    typegen: __dirname + '/../generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})
