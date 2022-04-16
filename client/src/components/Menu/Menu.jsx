import React, { Component } from 'react';
import './Menu.css'
import $ from 'jquery';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            projects: [{ id: 1, title: "Health", isFavorite: true, color: "#ff0000" },
            { id: 2, title: "to-do-list", isFavorite: true, color: "#00ff00" },
            { id: 3, title: "Study", isFavorite: false, color: "#ff00ff" }]
        }
    }

    printProjects(projects) {
        return (
            <div className="projects-panel">
                {projects.map(project =>
                    <div key={ project.id } className="project-tab">
                        <div className="project-name">
                            <span className="project-dot">
                                <svg width="20" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="5" fill={ project.color }/>
                                </svg>
                            </span>

                            <span> {project.title} </span>
                        </div>
                        <div className="project-misc">
                            <span>1</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    drawDownArrow() {
        return (
            <svg width="16px" height="16px" viewBox="0 0 16 16">
                <g transform="translate(-266, -17)" fill="#777777">
                    <path d="M280,22.7581818 L279.1564,22 L273.9922,26.506 L273.4414,26.0254545 L273.4444,26.0281818 L268.8562,22.0245455 L268,22.7712727 C269.2678,23.878 272.8084,26.9674545 273.9922,28 C274.8718,27.2330909 274.0144,27.9809091 280,22.7581818">
                    </path>
                </g>
            </svg>
        )
    }

    hideExpansion(id) {
        var displaying = $(`#${id}`).css("display");
        if (displaying === "none")
            $(`#${id}`).css("display", "block");
        else
            $(`#${id}`).css("display", "none");
    }

    render() {
        return (
            <div className="menu">
                <h2>Menu</h2>
                <div className="projects-panel">
                    <div className="project-tab"> <div className='project-name'> <span> Incoming </span> </div> </div>
                    <div className="project-tab"> <div className='project-name'> <span> Today </span> </div> </div>
                    <div className="project-tab"> <div className='project-name'> <span> Upcoming </span> </div> </div>
                    <div className="project-tab"> <div className='project-name'> <span> Filters </span> </div> </div> 
                </div>

                <div className="expansion-panel" onClick={() => this.hideExpansion("favorite_projects")}>
                    {this.drawDownArrow()}
                    <span> Favorites </span>
                </div>

                <div id="favorite_projects">
                    <div className="favorites">
                        {this.printProjects(
                            this.state.projects.filter(project => project.isFavorite)
                        )}
                    </div>
                </div>

                <div className="expansion-panel"  onClick={() => this.hideExpansion("all_projects")}>
                    {this.drawDownArrow()}
                    <span> All projects </span>
                </div>
                <div id="all_projects">
                    {this.printProjects(this.state.projects)}
                </div>
            </div>
        )
    }
}

export default Menu;
