import './App.css';
import Header from './components/header/Header';
import Chat from './components/chat/Chat';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001")

function App() {
  return (
    <div className="App">
      <Header />
      <Chat socket={socket}/>
    </div>
  );
}

export default App;
