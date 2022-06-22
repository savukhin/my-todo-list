import "./TaskPanel.css";
import $ from 'jquery';
import { useEffect, useState } from 'react';
import PopupSelect from "../Basic Components/PopupSelect/PopupSelect";

function TaskPanel({ projects, task, updateTasks, cleanChosen }) {
    const [chosenProject, setChosenProject] = useState(null);
    const [chosenPriority, setChosenPriority] = useState(null);

    function hidePanel() {
        cleanChosen();
    }

    if (!task || task == null || task === false)
        return (<></>);

    function outerClick(event) {
        if (event.target === event.currentTarget)
            hidePanel();
    }

    function sendRequest(task_id, project_id, priority, title) {
        const req = {
            token: localStorage.getItem('token'),
            title,
            task_id,
            project_id,
            priority
        }
        console.log(req);

        fetch('/api/tasks/changeTask', {
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
                hidePanel();
                updateTasks();
            })
            .catch(error => {
            });
    }

    function sendRequestClick() {
        let task_id = task.id;
        let project_id = (chosenProject ? chosenProject : task.projectId);
        let priority = (chosenPriority ? chosenPriority : task.priority);
        let title = $('#task-change-title').val();
            
        sendRequest(task_id, project_id, priority, title);

        cleanChosen();
    }

    return (
        <div id="edit-task-container" className="central-panel-container" onClick={outerClick}>
            <div id="task-panel">
                <div className='header'>
                    Edit task '{task.title}'
                </div>
                <div className='content'>
                    <div>
                        <label htmlFor='task-change-title'>Title</label>
                        <input id="task-change-title" value={task.title} onChange={() => { }}></input>
                    </div>
                    <hr />
                    <div>
                        <label>Project</label>
                        <PopupSelect
                            icons={
                                projects.map((project, key) =>
                                    <span key={key} className="project-dot">
                                        <svg width="20" viewBox="0 0 20 20">
                                            <circle cx="10" cy="10" r="5" fill={project.color} />
                                        </svg>
                                    </span>
                                )
                            }
                            titles={projects.map(project => project.title)}
                            keys={projects.map(project => project.id)}
                            setter={setChosenProject}
                            default_key={task.projectId}
                        />
                    </div>

                    <hr />
                    <div>
                        <label>Priority</label>
                        <PopupSelect
                            icons={
                                ['red', 'yellow', 'blue', 'white'].map((project, key) =>
                                    <span key={key} className="project-dot">
                                        <svg width="20" viewBox="0 0 20 20">
                                            <path d="M4.223 4.584A.5.5 0 004 
                                                5v14.5a.5.5 0 001 0v-5.723C5.886 
                                                13.262 7.05 13 8.5 13c.97 0 1.704.178 
                                                3.342.724 1.737.58 2.545.776 3.658.776 
                                                1.759 0 3.187-.357 4.277-1.084A.5.5 0 
                                                0020 13V4.5a.5.5 0 00-.777-.416C18.313 
                                                4.69 17.075 5 15.5 5c-.97 
                                                0-1.704-.178-3.342-.724C10.421 3.696
                                                9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 
                                                1.084z" 
                                            fill={project}></path>
                                        </svg>
                                    </span>
                                )
                            }
                            titles={[...Array(4).keys()].map(num => "Priority " + num).reverse()}
                            keys={[3, 2, 1, 0]}
                            setter={setChosenPriority}
                            default_key={task.priority}
                        />
                    </div>
                    <button className="button accept" onClick={sendRequestClick} > Change task </button>
                    <button className="button warning" onClick={hidePanel}> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default TaskPanel;