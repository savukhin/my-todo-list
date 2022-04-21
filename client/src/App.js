import './App.css';
import RegistrationPage from './pages/Registration';
import TodoListPage from './pages/TodoList';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChangePasswordPage from './pages/ChangePassword';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
      isLoggedIn: false,
      isLoading: true
    }

    // this.auth();
  }

  componentDidMount() {
    this.auth();
  }

  auth() {
    const req = {
      token: localStorage.getItem('token')
  }
    fetch('/api/auth/check-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error
        }
      })
      .then (res => res.json())
      .then(res => {
          this.setState({ isLoading: false, isLoggedIn: true, user: res.user });
      }).catch(error => {
        this.setState({ isLoading: false, isLoggedIn: false, user: false });
      });
  }

  generateLogRoute(path, component, redirect, loggedConditional=true) {
    return (
      <Route exact path={ path } element={this.state.isLoggedIn === loggedConditional
        ? component : (this.state.isLoading ? 'Loading...' : <Navigate to={redirect} />) }></Route>
    )
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            { this.generateLogRoute("/reg", <RegistrationPage authCallback={ this.auth }/>, "/", false) }
            { this.generateLogRoute("/login", <LoginPage authCallback={ this.auth }/>, "/", false) }

            { this.generateLogRoute("/change-password", <ChangePasswordPage user={this.state.user} />, "/login", true) }
            { this.generateLogRoute("/", <TodoListPage user={this.state.user} />, "/login", true) }
            { this.generateLogRoute("/app", <TodoListPage user={this.state.user} />, "/login", true) }
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
