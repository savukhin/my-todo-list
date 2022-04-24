import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Tasks from '../../components/Tasks/Tasks';
import { useNavigate } from 'react-router-dom'
import ProjectPanel from '../../components/ProjectPanel/ProjectPanel.jsx';

class TodoListPage extends Component {
  constructor(props) {
    super()
    this.state = {
      user: props.user,
      projects: [{ id: 1, title: "Health", isFavorite: true, color: "#ff0000" },
      { id: 2, title: "to-do-list", isFavorite: true, color: "#00ff00" },
      { id: 3, title: "Study", isFavorite: false, color: "#ff00ff" }]
    }
  }

  getProjects() {
    const req = {
      token: localStorage.getItem('token')
    }

    fetch('/api/projects/get', {
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
          throw error;
        }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({ projects: res.data });
      });
  }

  componentDidMount() {
    this.getProjects();
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Navbar />
          <Menu projects={this.state.projects} getProjects={this.getProjects} />
          <Tasks projects={this.state.projects} />
        </div>
      </div>
    );
  }
}

export default TodoListPage;
