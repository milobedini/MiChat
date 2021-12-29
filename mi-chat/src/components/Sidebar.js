import '../styles/Sidebar.scss'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { IconButton, Avatar } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'

import milopic from '../images/milopic.jpg'
import SidebarChat from './SidebarChat'
import { Link } from 'react-router-dom'

const Sidebar = ({ conversations, isLoggedIn }) => {
  console.log(isLoggedIn)
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src={milopic} />
        <div className="sidebar-header-right">
          {isLoggedIn ? (
            <button>Logout</button>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}

          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <Link to="/new">
            <IconButton>
              <ChatIcon />
            </IconButton>
          </Link>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type={'text'} />
        </div>
      </div>
      <div className="sidebar-chats">
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation._id}>
              <SidebarChat {...conversation} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
