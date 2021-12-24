import mongoose from 'mongoose'
// import Message from '../models/message.js'
import User from '../models/user.js'
// import messageData from './data/messages.js'
import userData from './data/user.js'
import conversationData from './data/conversations.js'
import { dbURI } from '../config/environment.js'
import Conversation from '../models/conversation.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Connected to db')

    await mongoose.connection.db.dropDatabase()
    console.log('DB dropped')

    const users = await User.create(userData)
    console.log(`DB seeded with ${users.length} users`)

    // const messagesWithOwners = messageData.map((message) => {
    //   message.owner = users[0]._id
    //   return message
    // })

    // const messages = await Message.create(messagesWithOwners)
    // console.log(`DB seeded with ${messages.length} messages`)

    const conversationsWithOwners = conversationData.map((conversation) => {
      conversation.participants = [users[1]._id, users[2]._id]
      conversation.messages[0].owner = users[1]._id
      conversation.messages[1].owner = users[2]._id
      return conversation
    })

    const conversations = await Conversation.create(conversationsWithOwners)
    console.log(`DB seeded with ${conversations.length} conversations`)

    await mongoose.connection.close()
    console.log('connection with DB closed')
  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
    console.log('connection with DB closed due to error')
  }
}

seedDatabase()
