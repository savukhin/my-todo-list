import React, { Component } from 'react';
import './Tasks.css'
import $ from 'jquery'

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            // tasks: [{ id: 1, content: "Make a Front end" },
            // { id: 2, content: "Make a Back end" },
            // { id: 3, content: "Make a Lunch" },
            // { id: 4, content: "Take a Lunch" }]

            tasks: [],
            user: { username: "Sava" }
        }
    }

    showAddTaskBar() {
        $(`#add-task-suggestion`).css("display", "none");
        $(`#add-task`).css("display", "");
    }

    hideAddTaskBar() {
        $(`#add-task-suggestion`).css("display", "");
        $(`#add-task`).css("display", "none");
    }

    getTasks() {
        const req = {
            token: localStorage.getItem('token')
        }

        console.log(req);

        fetch('/api/tasks/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then (res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 'ok') {
                    console.log(`Got data: `, res.data);
                    // res.data.forEach()
                    this.setState({ tasks: res.data });
                } else {
                }
            });
    }

    componentDidMount() {
        $('#add-task').css("display", "none");
        this.getTasks(0)
    }

    addTask = (title) => {
        console.log(`started add task with ${title}`);

        const req = {
            token: localStorage.getItem('token'),
            title: "title",
            description: "",
        }

        console.log(req);

        fetch('/api/tasks/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then (res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 'ok') {
                    console.log(`Got data of add task: `, res.data);
                    // localStorage.setItem('token', res.data)
                } else {
                }
            });
    }

    addTaskClick() {
        var title = $(`#task-title`).val();
        // console.log(`title is '${title}''`);
        this.addTask(title);
    }

    render() {
        return (
            <div className="tasks">
                <div className='content'>
                    <h2>Tasks</h2>
                    <ul>
                        {this.state.tasks.map(task =>
                            <li key={task.id}>
                                <button></button>
                                <span>{task.title}</span>
                            </li>
                        )}
                    </ul>
                    <div id="add-task-suggestion" onClick={this.showAddTaskBar}>
                        <span>+</span>
                        <span>Add Task...</span>
                    </div>
                    <div id="add-task">
                        <div className='input-bar'>
                            <input id="task-title" />
                        </div>
                        <br/>
                        <button onClick={() => this.addTaskClick()}> Add Task </button>
                        <button style={{backgroundColor: 'var(--warning-color)'}} onClick={this.hideAddTaskBar}> Cancel </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tasks;
