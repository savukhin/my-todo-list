import "./TaskPanel.css";
import $, { event } from 'jquery';
import { useEffect } from 'react';

function TaskPanel(props) {
    function hidePanel() {
        $('#edit-task-container')
            .css("display", "none");
    }

    function showPanel() {
        $('#edit-task-container')
            .css("display", "");
    }

    useEffect( () => {
        if (props.task != null && props.task !== false)
            showPanel();
    })

    if (!props.task || props.task == null || props.task === false)
        return (<></>);

    function outerClick(event) {
        console.log(event);
        if (event.target === event.currentTarget)
            hidePanel();
    }

    return (
        <div id="edit-task-container" className="central-panel-container" onClick={ outerClick } style={{"display" : "none"}}>
            <div id="task-panel">
                <div className='header'>
                    Edit task '{ props.task.title }'
                </div>
                <div className='content'>
                    <div>
                        <label htmlFor='task-title'>Title</label>
                        <input id="task-title"></input>
                    </div>
                    <button className="button warning" onClick={ hidePanel }> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default TaskPanel;