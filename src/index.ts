import dotenv from 'dotenv'
import { Express } from 'express'

import { createServer } from './server'

dotenv.config()
const port = Number(process.env.PORT) || 4000

createServer().then(({ app, graphqlPath }) => {
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${graphqlPath}`),
  )
})
