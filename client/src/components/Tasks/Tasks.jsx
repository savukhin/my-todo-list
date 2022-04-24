import React, { Component } from 'react';
import './Tasks.css'
import $ from 'jquery'
import TaskPanel from '../TaskPanel/TaskPanel';

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            // tasks: [{ id: 1, content: "Make a Front end" },
            // { id: 2, content: "Make a Back end" },
            // { id: 3, content: "Make a Lunch" },
            // { id: 4, content: "Take a Lunch" }]

            tasks: [],
            user: { username: "Sava" },
            choosenTask: false,
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

        fetch('/api/tasks/get', {
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
        .then (res => res.json())
        .then(res => {
            this.setState({ tasks: res.data });
        });
    }

    componentDidMount() {
        $('#add-task').css("display", "none");
        this.getTasks();
    }

    addTask = (title) => {
        const req = {
            token: localStorage.getItem('token'),
            title: title,
            description: "",
        }

        fetch('/api/tasks/add', {
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
        .then (res => res.json())
        .then(res => {
            this.getTasks();
        });
    }

    addTaskClick() {
        var title = $(`#task-title`).val();
        this.addTask(title);
    }

    completeTask(taskId) {
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
        .then (res => res.json())
        .then(res => {
            this.getTasks();
            console.log("getTasks called");
        })
        .catch(error => {
            console.log("Catched error ", error);
        });
    }

    choseTask(taskId) {
        let task = this.state.tasks.filter(elem => elem.id === taskId)[0];
        this.setState({ chosenTask: task })

        // return (
        //     <TaskPanel task={ task } />
        // )
        // $(".tasks").append(`<TaskPanel task={ ${task} } />`)
    }

    render() {
        return (
            <div className="tasks">
                <div className='content'>
                    <h2>Tasks</h2>
                    <ul>
                        {this.state.tasks.filter(task => !task.completed).map(task =>
                            <li key={task.id} onClick={() => this.choseTask(task.id)}>
                                <button onClick={() => this.completeTask(task.id)}></button>
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

                {/* { this.state.showTaskPanel ? <TaskPanel showState={ this.state.showTaskPanel } task={ this.state.chosenTask }/> : null} */}
                {/* { this.state.showTaskPanel ? <TaskPanel /> : null} */}
                <TaskPanel projects={ this.props.projects } task={ this.state.chosenTask }/>
            </div>
        )
    }
}

export default Tasks;
