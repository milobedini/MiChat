import express from 'express'
import {
  getAllMessages,
  getSingleMessage,
  addMessage,
} from '../controllers/messages.js'

const router = express.Router()

router.route('/messages/sync').get(getAllMessages)

router.route('/messages/new').post(addMessage)

router.route(`/messages/sync/:id`).get(getSingleMessage)

export default router
