// imports
import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import cors from 'cors'
import router from './config/router.js'
// config
const app = express()

const startServers = async () => {
  try {
    // DB config
    await mongoose.connect(dbURI)
    console.log('database has launched')

    //json parser and cors
    app.use(express.json())
    app.use(cors())

    // logger middleware
    app.use((req, _res, next) => {
      console.log(`Request received for ${req.method} at ${req.url}`)
      next()
    })

    // router

    app.use('/api', router)

    // catch all
    app.use((_req, res) => {
      res.status(404).json({ message: 'Route not found' })
    })

    // listener
    app.listen(port, () =>
      console.log(`Server up and listening on port ${port}`)
    )
  } catch (err) {
    console.log('Encountered issues', err)
  }
}
startServers()
