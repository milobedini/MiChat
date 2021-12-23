import mongoose from 'mongoose'

const michatSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
})

export default mongoose.model('messagecontent', michatSchema)
