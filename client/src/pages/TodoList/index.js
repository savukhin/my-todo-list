import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Tasks from '../../components/Tasks/Tasks';
import { useNavigate } from 'react-router-dom'

class TodoListPage extends Component {
  constructor(props) {
    super()
    this.state = {
      user: props.user,
    }
  }

  render() {
      return (
        <div className="wrapper">
            <Navbar />
            <Menu />
            <Tasks />
        </div>
    );
  }
}

export default TodoListPage;
