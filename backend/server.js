// imports
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'
// config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
  appId: '1321542',
  key: '328ccb8fcb9341b089ca',
  secret: 'b9a057d8cacaf5d7b978',
  cluster: 'eu',
  useTLS: true,
})

//json parser
app.use(express.json())
app.use(cors())
// app.use(cors)
// logger middleware
app.use((req, _res, next) => {
  console.log(`Request received for ${req.method} at ${req.url}`)
  next()
})

// DB config
const connectionUrl = `mongodb+srv://admin:mrgrdd74kCeWL6i@cluster0.6jwxp.mongodb.net/michatdb?retryWrites=true&w=majority`
mongoose.connect(connectionUrl)

const db = mongoose.connection

// once db connected
db.once('open', () => {
  console.log('DB connected')
  const messageCollection = db.collection('messagecontents')
  const changeStream = messageCollection.watch()
  //   fire off once something changes
  changeStream.on('change', (change) => {
    console.log('Incoming change')

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      //   insert data into messages channel
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      })
      //   above will appear in pusher debug console
    } else {
      console.log('Error triggering Pusher')
    }
  })
})

// api routes
app.get('/', (_req, res) => res.status(200).send("You're all good")) // test route

app.get('/api/messages/sync', (_req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/api/messages/new', (req, res) => {
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

// listener
app.listen(port, () => console.log(`Server up and listening on port ${port}`))
