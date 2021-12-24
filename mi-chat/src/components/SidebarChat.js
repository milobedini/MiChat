import { Avatar } from '@material-ui/core'
import '../styles/SidebarChat.scss'

const SidebarChat = ({ _id, participants, messages }) => {
  return (
    <div className="sidebar-chat">
      <Avatar />
      <div className="sidebar-chat-info">
        <h2>
          {participants.map((participant) => (
            <span key={participant._id}>
              <small>{participant.fullname}, </small>
            </span>
          ))}
        </h2>
        <p>Most recent message:</p>
        <p>{messages[0].message}</p>
      </div>
    </div>
  )
}

export default SidebarChat
