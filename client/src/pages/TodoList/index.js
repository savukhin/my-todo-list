import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Tasks from '../../components/Tasks/Tasks';

class TodoListPage extends Component {
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
