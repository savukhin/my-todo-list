import React, { Component } from 'react';
import './Navbar.css'
import {Helmet} from "react-helmet";

class Navbar extends Component {
    logout() {
        
    }

    componentDidMount() {
        console.log("Navbar mounted");
    }

    render() {
        return (
            <div className="navbar">
                <Helmet>
                    <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet'/>
                </Helmet>
                <div className="left-part">
                    <div className="input-bar">
                        <input placeholder='search...'></input>
                    </div>
                </div>
                <div className="middle-part">
                    <span style={{backgroundColor: 'var(--frame-color)'}}>TO</span>
                    <span style={{backgroundColor: 'var(--main-bg-color)'}}>DO</span>
                    <span style={{backgroundColor: 'var(--warning-color)', fontFamily : 'Lobster'}}>LIST</span>
                </div>
                <div className="right-part">
                    <div className='profilePhoto'>
                        <img src={require("./../../img/blank-profile-picture-973460_1280.webp")} alt=""></img>
                    </div>
                    <button onClick={this.logout}>Log out</button>
                </div>
            </div>
        )
    }
}

export default Navbar;
