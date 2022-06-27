import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Tasks from '../../components/Tasks/Tasks';
import { useParams } from 'react-router-dom'


const TodoListPage = ({ user, isCategory = false, match, location }) => {

  const [projects, setProjects] = useState([{ id: 1, title: "Health", isFavorite: true, color: "#ff0000" },
  { id: 2, title: "to-do-list", isFavorite: true, color: "#00ff00" },
  { id: 3, title: "Study", isFavorite: false, color: "#ff00ff" }]);
  const [tasks, setTasks] = useState([]);

  // const {
  //   params: { projectId }
  // } = match;
  const { projectCategory, projectId } = useParams();

  const categoriesToReq = {
    "incoming": "getIncomings",
    "today": "getToday",
  }

  const [mount,] = useState(0);

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

  const getTasks = () => {
    let req = {
      token: localStorage.getItem('token')
    }

    if (isCategory)
      req.category = projectCategory;
    else
      req.project = projectId;

    fetch("/api/tasks/get/" + (isCategory ? "category" : "project"), {
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
        setTasks(res.data);
      });
  }

  function addTask(title) {
    const req = {
      token: localStorage.getItem('token'),
      title: title,
      description: "",
    }

    fetch('/api/tasks/add', {
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
        getTasks();
      });
  }

  useEffect(() => {
    getProjects();
  }, [mount]);

  return (
    <div>
      <div className="wrapper">
        <Navbar user={user}/>
        <Menu projects={projects} getProjects={getProjects} />
        <Tasks projects={projects} getTasks={getTasks} addTask={addTask} tasks={tasks} 
          key={isCategory ? projectCategory : projectId}/>
      </div>
    </div>
  );
}

export default TodoListPage;
