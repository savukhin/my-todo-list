import './App.css';
import RegistrationPage from './pages/Registration';
import TodoListPage from './pages/TodoList';
import { Route, BrowserRouter, Routes, Redirect } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChangePasswordPage from './pages/ChangePassword';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    }
  }

  auth() {
    const req = {
      token: localStorage('token')
  }

    fetch('/api/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then (res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'ok') {
                // console.log(`Got the token: `, res.data);
                this.setState({ authenticated: true });
            } else {
            }
        });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TodoListPage />}></Route>
            <Route exact path="/reg" element={<RegistrationPage />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/change-password" element={<ChangePasswordPage />}></Route>
            <Route exact path="/app" element={<TodoListPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
