import "./TaskPanel.css";
import $ from 'jquery';
import { useEffect } from 'react';
import Select from 'react-select';

function TaskPanel(props) {
    function hidePanel() {
        $('#edit-task-container')
            .css("display", "none");
    }

    function showPanel() {
        $('#edit-task-container')
            .css("display", "");
    }

    useEffect(() => {
        if (props.task != null && props.task !== false)
            showPanel();
    })

    if (!props.task || props.task == null || props.task === false)
        return (<></>);

    function outerClick(event) {
        if (event.target === event.currentTarget)
            hidePanel();
    }

    let selectOptions = [];
    props.projects.map(project =>
        selectOptions.push({
            label:
                <div className="project-tab">
                    <div className="project-name">
                        <span className="project-dot">
                            <svg width="20" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="5" fill={project.color} />
                            </svg>
                        </span>
                        <span>{project.title}</span>
                    </div>
                </div>,
            value: project.title,
            project_id: project.id
        })
    )

    function hideProjectSelect() {
        $("#task-project").css("display", "none");
    }

    function showProjectSelect() {
        $("#task-project").css("display", "");
    }

    function toggleProjectSelect(event) {
        if ($("#task-project").css("display") === "none")
            showProjectSelect()
        else
            hideProjectSelect()
    }

    const styles = {
        container: (provided, state) => ({
            ...provided,
            width: "300px",
            maxHeight: "100px",
        }),
        input: (provided, state) => ({
            ...provided,
            color: "var(--text-color)",
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--second-bg-color)",
            color: "var(--text-color)",
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--text-color)",
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--frame-color)",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--second-bg-color)",
            fontSize: state.selectProps.myFontSize
        }),
        singleValue: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--second-bg-color)",
            color: "var(--text-color)",
        })
    };

    let selectRef = null;
    let chosenProject = null;

    function selectProject(event) {
        if (event === null)
            return;

        let project = props.projects.filter(
            elem => elem.id === event.project_id
        )[0];

        chosenProject = project;

        $(`#task-project-title`).html(project.title);
        $(`#task-project-svg`).html(`
                <svg width="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="5" fill="${project.color}" />
                </svg>
        `);

        setTimeout(() => selectRef.clearValue(), 0);

        hideProjectSelect();
    }

    function sendRequest(task_id, project_id, title) {
        const req = {
            token: localStorage.getItem('token'),
            title,
            task_id,
            project_id
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
                props.updateTasks();
            })
            .catch(error => {
            });
    }

    function sendRequestClick() {
        let task_id = props.task.id;
        let project_id;
        if (chosenProject == null)
            project_id = "null";
        else
            project_id = chosenProject.id;
        let title = $('#task-change-title').val();
        sendRequest(task_id, project_id, title);

        props.cleanChosen();
    }

    return (
        <div id="edit-task-container" className="central-panel-container" onClick={outerClick} style={{ "display": "none" }}>
            <div id="task-panel">
                <div className='header'>
                    Edit task '{props.task.title}'
                </div>
                <div className='content'>
                    <div>
                        <label htmlFor='task-change-title'>Title</label>
                        <input id="task-change-title" value={props.task.title} onChange={() => { }}></input>
                    </div>
                    <hr />
                    <div>
                        <label htmlFor='task-project'>Project</label>
                        <div className="button" onClick={toggleProjectSelect}>
                            <div id="task-project-chose" className="project-tab">
                                <div className="project-name">
                                    <span id="task-project-svg" className="project-dot">
                                        {props.projects.filter(elem => elem.id === props.task.projectId).length > 0
                                            ? <svg width="20" viewBox="0 0 20 20">
                                                <circle cx="10" cy="10" r="5" fill={props.projects.filter(elem => elem.id === props.task.projectId)[0].color} />
                                            </svg>
                                            : <></>}
                                    </span>
                                    <span id="task-project-title">
                                    {props.projects.filter(elem => elem.id === props.task.projectId).length > 0
                                        ? props.projects.filter(elem => elem.id === props.task.projectId)[0].title
                                        : <>No project</> }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id="task-project" style={{ "display": "none" }}>
                            <Select
                                ref={ref => {
                                    selectRef = ref;
                                }}
                                myFontSize="20px"
                                styles={styles}
                                options={selectOptions}
                                onChange={selectProject}
                            />
                        </div>

                    </div>
                    <button className="button accept" onClick={sendRequestClick} > Change task </button>
                    <button className="button warning" onClick={hidePanel}> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default TaskPanel;