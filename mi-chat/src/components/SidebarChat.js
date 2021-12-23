import { Avatar } from '@material-ui/core'
import '../styles/SidebarChat.scss'

const SidebarChat = () => {
  return (
    <div className="sidebar-chat">
      <Avatar />
      <div className="sidebar-chat-info">
        <h2>Room name</h2>
        <p>Most recent message</p>
      </div>
    </div>
  )
}

export default SidebarChat
