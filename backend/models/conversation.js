import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const messageSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
)
messageSchema.plugin(uniqueValidator)

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
)

conversationSchema.plugin(uniqueValidator)

export default mongoose.model('Conversation', conversationSchema)
