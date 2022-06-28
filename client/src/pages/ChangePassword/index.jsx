import React, { Component, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Menu from '../../components/Menu/Menu';

const ChangePasswordPage = ({ user, projects, getProjects }) => {
    const [ hiddenPasswords, setHiddenPasswords ] = useState(true);
    const [ errors, setErrors ] = useState(null);

    const changePassword = (event) => {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const new_password = document.getElementById("new_password").value;
        const new_password2 = document.getElementById("new_password2").value;
        const req = {
            password,
            new_password,
            new_password2
        }

        fetch('/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token' : localStorage.getItem('token')
            },
            body: JSON.stringify(req)
        }).then (res => res.json())
            .then(res => {
                if (res.status === 'ok') {
                    localStorage.setItem('token', res.data);
                    window.location.reload();
                } else {
                    setErrors(res.errors);
                }
            });
    }

    return (
        <div className="wrapper">
            <Navbar user={user}/>
            <Menu projects={projects} getProjects={getProjects} />
            <div>
                <h1>Change Passoword</h1>
                <form id="change-password" onSubmit={changePassword}>
                    <label htmlFor="password">Old Password </label>
                    <input autoComplete='off' type={hiddenPasswords ? "password" : "text"} id="password"></input>
                    <br />
                    <label htmlFor="new_password">New Password </label>
                    <input autoComplete='off' type={hiddenPasswords ? "password" : "text"} id="new_password"></input>
                    <br />
                    <label htmlFor="new_password2">Confirm new Password </label>
                    <input autoComplete='off' type={hiddenPasswords ? "password" : "text"} id="new_password2"></input>
                    <br />
                    <br />
                    <button className='button'>Send</button>
                </form>
                <br />
                { errors &&
                    <>
                        { errors.map(error => 
                            <>
                                <span className='warning'>
                                    { error.msg }
                                </span>
                                <br/>
                            </>
                        ) }
                        <br/>
                    </>
                }

                <button className='button' onClick={() => {setHiddenPasswords(!hiddenPasswords)}}>
                    {hiddenPasswords
                        ? "Show passwords"
                        : "Hide passwords"
                    }
                </button>
            </div>
        </div>   
    );
}

export default ChangePasswordPage;
