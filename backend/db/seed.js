import mongoose from 'mongoose'
import dbMessages from '../models/dbMessages.js'
import User from '../models/user.js'
import messageData from './data/messages.js'
import userData from './data/user.js'
import { dbURI } from '../config/environment.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Connected to db')

    await mongoose.connection.db.dropDatabase()
    console.log('DB dropped')

    const users = await User.create(userData)
    console.log(`DB seeded with ${users.length} users`)

    const messagesWithOwners = messageData.map((message) => {
      message.owner = users[0]._id
      return message
    })

    const messages = await dbMessages.create(messagesWithOwners)
    console.log(`DB seeded with ${messages.length} messages`)

    await mongoose.connection.close()
    console.log('connection with DB closed')
  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
    console.log('connection with DB closed due to error')
  }
}

seedDatabase()
