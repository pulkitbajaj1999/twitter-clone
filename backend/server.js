// core modules imports
const path = require('path')
const fs = require('fs')

// third-party imports
require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const cors = require('cors')
// const multer = require('multer')
// const bcryptjs = require('bcryptjs')
// const csurf = require('csurf')
// const helmet = require('helmet')
// const compression = require('compression')

// const User = require('./models/user')
// const b2 = require('./utils/b2')
const dbConnect = require('./utils/db').dbConnect
const typeDefs = require('./schema/type-defs')
const resolvers = require('./schema/resolvers')
const contextObject = require('./schema/context-object')

// declare constants
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || '0.0.0.0'
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter-clone'
const FRONTEND_BUILD_PATH = path.resolve('..', 'frontend', 'build')

const serverConfig = {
  typeDefs,
  resolvers,
}
const app = express()
const apolloServer = new ApolloServer(serverConfig)
// const multerStorage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       new Date().getTime() +
//         '-' +
//         file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase()
//     )
//   },
//   destination: (req, file, cb) => {
//     // create the directories if not exist
//     fs.mkdirSync('static/media/audio', { recursive: true })
//     fs.mkdirSync('static/media/images', { recursive: true })

//     // save the files based on the field provided
//     if (file.fieldname === 'imageFile') {
//       cb(null, './static/media/images')
//     } else if (file.fieldname === 'audioFile') {
//       cb(null, './static/media/audio')
//     } else {
//       cb(Error('unknown field'))
//     }
//   },
// })

// const multerMiddleware = multer({
//   storage: multerStorage,
//   limits: {
//     fileSize: (process.env.MULTER_MAX_FILE_SIZE || 1) * 1024 * 1024,
//   },
// }).fields([
//   { name: 'imageFile', maxCount: 1 },
//   { name: 'audioFile', maxCount: 1 },
// ])

app.use(cors())

// using compression
// app.use(compression())

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
// parsing body-content
// app.use((req, res, next) => {
//   multerMiddleware(req, res, (err) => {
//     if (err)
//       return res.status(500).json({
//         status: 'error',
//         msg: 'Error while storing files using multer storage!',
//         err: err,
//       })
//     next()
//   })
// })

// serve public files
app.use(express.static(path.join(__dirname, 'public')))
// serve media files from local storage
// app.use('/media', express.static(path.join(__dirname, 'static', 'media')))
// // if b2-storage flag is enabled fetch file from b2 to local
// if (process.env.ENABLE_B2_STORAGE === 'true') {
//   app.use('/media', (req, res, next) => {
//     const localBaseFolder = 'static'
//     const fileKey = req.originalUrl.startsWith('/')
//       ? req.originalUrl.slice(1)
//       : req.originalUrl
//     b2.fetchFileToLocal(fileKey, localBaseFolder).then((buffer) => {
//       if (buffer) {
//         if (fileKey.startsWith('media/audio')) {
//           res.setHeader('Content-Type', 'audio/mp3')
//         }
//         return res.send(buffer)
//       } else {
//         return next()
//       }
//     })
//   })
// }

// serve static files from frontend build
app.use(express.static(FRONTEND_BUILD_PATH))

apolloServer.start().then(() => {
  console.log('appolo server started')
  app.use(
    '/graphql',
    expressMiddleware(apolloServer, { context: contextObject })
  )
  // serve frontend routes
  app.get('/*', (req, res, next) => {
    const indexPath = path.join(FRONTEND_BUILD_PATH, 'index.html')
    if (fs.existsSync(indexPath)) return res.status(200).sendFile(indexPath)
    else {
      return res.redirect('/graphql')
    }
    next()
  })
})

// serve graphql routes and then serve react routes after serving graphql routes
// start server
dbConnect(MONGODB_URI).then(() => {
  console.log('Database connected!')
  app.listen(PORT, HOST, (err) => {
    console.log(`App started at port:${PORT}`)
  })
})
