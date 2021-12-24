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

export const getSingleConversation = async (req, res) => {
  try {
    const { id } = req.params
    const conversation = await Conversation.findById(id)
      .populate('participants')
      .populate({
        path: 'messages',
        populate: {
          path: 'owner',
          model: 'User',
        },
      })
      .sort({ updatedAt: 'desc', 'messages.createdAt': 'desc' })
    return res.status(200).json(conversation)
  } catch (err) {
    console.log(err, 'Convo not found')
    return res.status(404).json({ message: 'Conversation not found' })
  }
}
