import React, { Component } from 'react';
import './Navbar.css'
import {Helmet} from "react-helmet";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <Helmet>
                    <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet'/>
                </Helmet>
                <div className="left-part">
                    <div className="search-bar">
                        <input placeholder='search...'></input>
                    </div>
                </div>
                <div className="middle-part">
                    <span style={{'background-color': 'var(--frame-color)'}}>TO</span>
                    <span style={{'background-color': 'var(--main-bg-color)'}}>DO</span>
                    <span style={{'background-color': 'var(--warning-color)', 'font-family' : 'Lobster'}}>LIST</span>
                </div>
                <div className="right-part">
                    <div className='profilePhoto'>
                        <img src={require("./../../img/blank-profile-picture-973460_1280.webp")} alt=""></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
