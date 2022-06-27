import './App.css';
import RegistrationPage from './pages/Registration';
import TodoListPage from './pages/TodoList';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChangePasswordPage from './pages/ChangePassword';
import { Component, useEffect, useState } from 'react';
import Page404 from './pages/ResponsePages/Page404';

const App = () => {
  const [user, setUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [mount, ] = useState(0);

  useEffect(() => {
    auth();
  }, [mount]);

  const auth = () => {
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
          setIsLoading(false); 
          setIsLoggedIn(true);
          setUser(res.user);
      }).catch(error => {
        setIsLoading(false); 
        setIsLoggedIn(false);
        setUser(false);
      });
  }

  const generateLogRoute = (path, component, redirect, loggedConditional=true, rest) => {
    return (
      <Route path={ path } element={isLoggedIn === loggedConditional
        ? component : (isLoading ? 'Loading...' : <Navigate to={redirect} />) } {...rest}></Route>
    )
  }

  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          { generateLogRoute("/reg", <RegistrationPage authCallback={ auth }/>, "/", false) }
          { generateLogRoute("/login", <LoginPage authCallback={ auth }/>, "/", false) }

          { generateLogRoute("/change-password", <ChangePasswordPage user={user} />, "/login", true) }
          { ["/app", "/"].map((path, key) =>
            generateLogRoute(path, <Navigate to="/app/incoming"/>, "/login", true, {key:key})) }

          {/* { this.generateLogRoute("/app/:projectCategory", <TodoListPage user={this.state.user} isCategory={true}/>, "/login", true) } */}
          { generateLogRoute("/app/:projectCategory", <TodoListPage user={user} isCategory={true} />, "/login", true) }
          { generateLogRoute("/app/project/:projectId", <TodoListPage user={user} />, "/login", true) }

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
