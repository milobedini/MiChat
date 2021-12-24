import '../styles/ChatList.scss'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useState } from 'react'
import axios from './Axios'
import Chat from './Chat'

const ChatList = ({ conversations }) => {
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
        {conversations.map((conversation) => (
          <Chat {...conversation} key={conversation._id} />
        ))}
        {/* {conversations.map((conversation, index) => (
          <p
            key={index}
            // not current user logic below
            className={`chat-message ${
              conversation.received && 'chat-receiver'
            }`}
          >
            <span className="chat-name">{conversation.messages.fullname}</span>
            {conversation.messages.message}
            <span className="chat-timestamp">
              {conversation.message.createdAt}
            </span>
          </p>
        ))} */}
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

export default ChatList
