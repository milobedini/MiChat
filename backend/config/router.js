import express from 'express'
import { getAllConversations } from '../controllers/conversations.js'
// import {
//   getAllMessages,
//   getSingleMessage,
//   addMessage,
// } from '../controllers/messages.js'
import { getAllUsers } from '../controllers/users.js'

const router = express.Router()

// router.route('/messages/sync').get(getAllMessages)

// router.route('/messages/new').post(addMessage)

// router.route(`/messages/sync/:id`).get(getSingleMessage)

router.route('/users').get(getAllUsers) //test route

router.route('/conversations').get(getAllConversations) //test route

export default router
