import '../styles/Chat.scss'

const Chat = ({ messages }) => {
  console.log(messages)
  return (
    // <p className="chat-message">
    <>
      {messages.map((message) => (
        <p
          key={message._id}
          className={`chat-message ${
            message.owner.fullname.includes('John') && 'chat-receiver'
          }`}
        >
          <span className="chat-name">{message.owner.fullname}</span>
          {message.message}
          <span className="chat-timestamp">{message.createdAt}</span>
        </p>
      ))}
    </>
  )
}

export default Chat
