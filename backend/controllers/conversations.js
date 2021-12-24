import Conversation from '../models/conversation.js'

export const getAllConversations = async (_req, res) => {
  const conversations = await Conversation.find()
    .populate('participants')
    .populate({
      path: 'messages',
      populate: {
        path: 'owner',
        model: 'User',
      },
    })
  return res.status(200).json(conversations)
}
