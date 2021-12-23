import Message from '../models/dbMessages.js'

export const getAllMessages = async (_req, res) => {
  const messages = await Message.find() //populate('owner') here
  return res.status(200).json(messages)
}

export const getSingleMessage = async (req, res) => {
  try {
    const { id } = req.params
    const message = await (await Message.findById(id)).populate('owner')
    return res.status(200).json(message)
  } catch (err) {
    console.log('Message Not Found')
    return res.status(404).json({ message: 'Message Not Found' })
  }
}

export const addMessage = async (req, res) => {
  try {
    const newMessage = { ...req.body, owner: req.currentUser._id }
    const messageToAdd = await Message.create(newMessage)
    console.log(messageToAdd)
    return res.status(201).json(messageToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}
