import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import './styles/main.scss'

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default App
