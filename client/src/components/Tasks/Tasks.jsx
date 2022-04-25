import React, { useEffect, useState } from 'react';
import './Tasks.css'
import $ from 'jquery'
import TaskPanel from '../TaskPanel/TaskPanel';

const Tasks = ({ projects, tasks, getTasks, addTask }) => {
    
    const [user, setUser] = useState({ username: "Sava" });
    let [chosenTask, setChosenTask] = useState(false);

    function showAddTaskBar() {
        $(`#add-task-suggestion`).css("display", "none");
        $(`#add-task`).css("display", "");
    }

    function hideAddTaskBar() {
        $(`#add-task-suggestion`).css("display", "");
        $(`#add-task`).css("display", "none");
    }

    function addTaskClick() {
        var title = $(`#task-title`).val();
        addTask(title);
    }

    function completeTask(taskId) {
        const req = {
            token: localStorage.getItem('token'),
            taskId
        }

        fetch('/api/tasks/complete', {
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
                getTasks();
                console.log("getTasks called");
            })
            .catch(error => {
                console.log("Catched error ", error);
            });
    }

    function choseTask(taskId) {
        let task = tasks.filter(elem => elem.id === taskId)[0];
        setChosenTask(task);
    }

    const [onMount, ] = useState(0);

    useEffect(() => {
        $('#add-task').css("display", "none");
        getTasks();
    }, [onMount]);

    return (
        <div className="tasks">
            <div className='content'>
                <h2>Tasks</h2>
                <ul>
                    {tasks.filter(task => !task.completed).map(task =>
                        <li key={task.id} onClick={() => choseTask(task.id)}>
                            <button onClick={() => completeTask(task.id)}></button>
                            <span>{task.title}</span>
                            <span>{task.projectId || "-1"}</span>
                        </li>
                    )}
                </ul>
                <div id="add-task-suggestion" onClick={showAddTaskBar}>
                    <span>+</span>
                    <span>Add Task...</span>
                </div>
                <div id="add-task">
                    <div className='input-bar'>
                        <input id="task-title" />
                    </div>
                    <br />
                    <button onClick={() => addTaskClick()}> Add Task </button>
                    <button style={{ backgroundColor: 'var(--warning-color)' }} onClick={hideAddTaskBar}> Cancel </button>
                </div>
            </div>

            {/* { this.state.showTaskPanel ? <TaskPanel showState={ this.state.showTaskPanel } task={ this.state.chosenTask }/> : null} */}
            {/* { this.state.showTaskPanel ? <TaskPanel /> : null} */}
            <TaskPanel projects={projects} task={chosenTask} updateTasks={getTasks} cleanChosen={() => setChosenTask(0)} />
        </div>
    )
}

export default Tasks;
