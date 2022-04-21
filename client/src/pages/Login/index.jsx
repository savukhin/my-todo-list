import React, { useEffect } from 'react';
import $ from "jquery";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const navigator = useNavigate();

    function login(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const req = {
            username,
            password,
        }

        fetch('/api/auth/login', {
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
                throw error
            }
            })
        .then(res => res.json())
        .then(res => {
            navigator('/');
            navigator(0);
        }).catch(error => {
            // console.log("error is ", error);
        });
    }

    useEffect(() => {
        const form = document.getElementById('login');
        form.addEventListener("submit", login);
        return () => {
            form.removeEventListener("submit", login);
        }
    })

    return (
        <div>
            <h1>Login</h1>
            <form id="login">
                <label htmlFor="username">Login </label>
                <input autoComplete='off' id="username"></input>
                <br />
                <label htmlFor="password">Password </label>
                <input autoComplete='off' type="password" id="password"></input>
                <br />
                <input type="submit" value="Send" className='button' />
            </form>

            <br />
            <Link to="/reg" className="button">Register</Link>
        </div>
    );
}

export default LoginPage;
