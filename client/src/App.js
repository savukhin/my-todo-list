import './App.css';
import Menu from './components/Menu/Menu.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Tasks from './components/Tasks/Tasks.jsx'

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Navbar />
        <Menu />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
