import './App.css';
import RegistrationPage from './pages/Registration';
import TodoListPage from './pages/TodoList';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/reg" element={<RegistrationPage />}></Route>
          <Route exact path="/app" element={<TodoListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
