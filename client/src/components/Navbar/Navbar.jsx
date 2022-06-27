import React, { Component } from 'react';
import './Navbar.css'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    const logout = () => {
        
    }

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
                    <Link to={{ pathname:"/user/"+user.id}}>
                        <img src={user.avatar
                            ? user.avatar
                            : require("./../../img/blank-profile-picture-973460_1280.webp")} alt=""></img>
                    </Link>
                </div>
                <button onClick={logout}>Log out</button>
            </div>
        </div>
    )
}

export default Navbar;
