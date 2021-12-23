// imports
import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import Messages from './models/dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'
import router from './config/router.js'
// config
const app = express()

const pusher = new Pusher({
  appId: '1321542',
  key: '328ccb8fcb9341b089ca',
  secret: 'b9a057d8cacaf5d7b978',
  cluster: 'eu',
  useTLS: true,
})

const startServers = async () => {
  try {
    // DB config
    await mongoose.connect(dbURI)
    console.log('database has launched')

    //json parser
    app.use(express.json())
    app.use(cors())

    mongoose.connection.once('open', () => {
      console.log('DB connected')
      const messageCollection = mongoose.collection('messagecontents')
      const changeStream = messageCollection.watch()
      //   fire off once something changes
      changeStream.on('change', (change) => {
        console.log('Incoming change')

        if (change.operationType === 'insert') {
          const messageDetails = change.fullDocument
          //   insert data into messages channel
          pusher.trigger('messages', 'inserted', {
            message: messageDetails.message,
          })
          //   above will appear in pusher debug console
        } else {
          console.log('Error triggering Pusher')
        }
      })
    })

    // logger middleware
    app.use((req, _res, next) => {
      console.log(`Request received for ${req.method} at ${req.url}`)
      next()
    })

    // once db connected
    // console.log(mongoose.connection)

    // routes

    app.use('/api', router)

    // app.get('/', (_req, res) => res.status(200).send("You're all good")) // test route

    // app.get('/api/messages/sync', (_req, res) => {
    //   Messages.find((err, data) => {
    //     if (err) {
    //       res.status(500).send(err)
    //     } else {
    //       res.status(200).send(data)
    //     }
    //   })
    // })

    // app.post('/api/messages/new', (req, res) => {
    //   const dbMessage = req.body

    //   Messages.create(dbMessage, (err, data) => {
    //     if (err) {
    //       res.status(500).send(err)
    //     } else {
    //       res.status(201).send(data)
    //     }
    //   })
    // })
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
