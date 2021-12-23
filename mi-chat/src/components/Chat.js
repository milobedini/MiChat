import '../styles/Chat.scss'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useState } from 'react'
import axios from './Axios'

const Chat = ({ messages }) => {
  const [input, setInput] = useState('')

  const sendMessage = async (event) => {
    event.preventDefault()
    await axios.post('messages/new', {
      message: input,
      name: 'Milo Bedini',
      timestamp: 'just now',
      received: false,
    })
    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-header-info">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat-message ${message.received && 'chat-receiver'}`}
          >
            <span className="chat-name">{message.owner}</span>
            {message.message}
            <span className="chat-timestamp">{message.creaetedAt}</span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        <InsertEmoticonIcon />
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type a message"
            type={'text'}
          />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
