import User from '../models/user.js'

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
}
