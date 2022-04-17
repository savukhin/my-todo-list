import './App.css';
import RegistrationPage from './pages/Registration';
import TodoListPage from './pages/TodoList';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChangePasswordPage from './pages/ChangePassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/reg" element={<RegistrationPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/change-password" element={<ChangePasswordPage />}></Route>
          <Route exact path="/app" element={<TodoListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
