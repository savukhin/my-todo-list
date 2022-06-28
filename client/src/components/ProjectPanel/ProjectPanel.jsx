import React from 'react';
import './ProjectPanel.css';
import $ from 'jquery';

function ProjectPanel(props) {
    function hidePanel() {
        $('#edit-project-container')
            .css('display', 'none');
    }

    function createProject(title, color) {
        const req = {
            token: localStorage.getItem('token'),
            title,
            color
        }

        fetch('/api/projects/add', {
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
        .then (res => res.json())
        .then(res => {
            hidePanel();
            props.updateProject();
        })
        .catch(error => {
        });
    }

    function createProjectClick() {
        let title = $("#project-title").val();
        let color = $("#project-color").val();
        createProject(title, color);
    }

    function outerClick(event) {
        if (event.target === event.currentTarget)
            hidePanel();
    }

    return (
        <div id="edit-project-container" className="central-panel-container" onClick={ outerClick } style={{"display" : "none"}}>
            <div id="project-panel">
                <div className='header'>
                    Add project
                </div>
                <div className='content'>
                    <div>
                        <label htmlFor='project-title'>Title</label>
                        <input id="project-title"></input>
                    </div>
                    
                    <select id="project-color">
                        <option value="#ff0000"> Red </option>
                        <option value="#00ff00"> Green </option>
                        <option value="#0000ff"> Blue </option>
                    </select>
                    <button className="button accept" onClick={ createProjectClick } > Create Project </button>
                    <button className="button warning" onClick={ hidePanel }> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectPanel;
