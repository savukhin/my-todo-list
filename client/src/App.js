import './App.css';
import RegistrationPage from './pages/Registration';
import TodoListPage from './pages/TodoList';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChangePasswordPage from './pages/ChangePassword';
import { Component, useEffect, useState } from 'react';
import Page404 from './pages/ResponsePages/Page404';
import ProfilePage from './pages/Profile';

const App = () => {
  const [user, setUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([{ id: 1, title: "Health", isFavorite: true, color: "#ff0000" },
  { id: 2, title: "to-do-list", isFavorite: true, color: "#00ff00" },
  { id: 3, title: "Study", isFavorite: false, color: "#ff00ff" }]);

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
            'Content-Type': 'application/json',
            'token' : localStorage.getItem('token')
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

  const getProjects = () => {
    let req = {
      token: localStorage.getItem('token')
    }

    fetch('/api/projects/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token' : localStorage.getItem('token')
      },
      body: JSON.stringify(req)
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
      })
      .then(res => res.json())
      .then(res => {
        setProjects(res.data);
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
          { generateLogRoute("/app/:projectCategory", <TodoListPage user={user} projects={projects} isCategory={true} getProjects={getProjects} />, "/login", true) }
          { generateLogRoute("/app/project/:projectId", <TodoListPage user={user} projects={projects} getProjects={getProjects} />, "/login", true) }

          { generateLogRoute("/user/:profileId", <ProfilePage user={user} projects={projects} getProjects={getProjects} />, "/login", true) }

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
