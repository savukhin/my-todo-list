import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Tasks from '../../components/Tasks/Tasks';
import { useParams } from 'react-router-dom'


const TodoListPage = ({ user, isCategory = false, match, location, projects, getProjects }) => {
  const [tasks, setTasks] = useState([]);

  const { projectCategory, projectId } = useParams();

  const categoriesToReq = {
    "incoming": "getIncomings",
    "today": "getToday",
  }

  const [mount,] = useState(0);

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
    if (isCategory) {
      document.title = projectCategory[0].toUpperCase() + projectCategory.slice(1) + " tasks";
    } else {
      document.title = projects.filter(project => project.id == projectId)[0].title;
    }
  }, [projectCategory, projectId])

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
