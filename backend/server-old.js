require('dotenv').config()
const express = require('express')
const dbConnect = require('./utils/db').dbConnect
const bodyparser = require('body-parser')
const cors = require('cors')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const typeDefs = require('./schema/type-defs')
const resolvers = require('./schema/resolvers')
const contextObject = require('./schema/context-object')

const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || '0.0.0.0'
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter-clone'

const serverConfig = {
  port: PORT,
  cors: true,
  typeDefs,
  resolvers,
}

const server = new ApolloServer(serverConfig)
const app = express()

server.start().then(() => {
  app.use(cors())
  app.use(bodyparser.urlencoded({ extended: true }))
  app.use(bodyparser.json())

  app.use('/graphql', expressMiddleware(server, { context: contextObject }))

  dbConnect(MONGODB_URI).then(() => {
    app.listen(8000, () => {
      console.log('server listening on 8000')
    })
  })
})
