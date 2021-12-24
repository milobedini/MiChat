import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import {
  getAllConversations,
  getSingleConversation,
} from '../controllers/conversations.js'
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

router.route('/conversations/:id').get(getSingleConversation)

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

export default router
