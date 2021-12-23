import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const michatSchema = new mongoose.Schema(
  {
    // message: String,
    // name: String,
    // timestamp: String,
    // received: Boolean,
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

michatSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('messagecontent', michatSchema)
