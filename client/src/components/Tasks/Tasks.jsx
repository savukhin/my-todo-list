import React, { Component } from 'react';
import './Tasks.css'

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [{id: 1, content: "Make a Front end"},
            {id: 2, content: "Make a Back end"},
            {id: 3, content: "Make a Lunch"},
            {id: 4, content: "Take a Lunch"}]
        }
    }

    render() {
        return (
            <div className="tasks">
                <h2>Tasks</h2>
                <ul>
                    {this.state.tasks.map(task =>
                    <li key={task.id}>  
                        <button></button>
                        <span>{ task.content }</span>
                    </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Tasks;
