import React, { useEffect } from 'react';
import $ from "jquery";
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const navigator = useNavigate();

    function registerUser(event) {
        event.preventDefault();
        var x = document.getElementById('reg-form');
        console.log(x);
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;
        const req = {
            username,
            email,
            password,
            password2
        }

        fetch('/api/auth/reg', {
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
        .then (res => {
            localStorage.setItem('token', res.token);
            navigator('/');
            navigator(0);
        });
    }

    useEffect(() => {
        const form = document.getElementById('reg-form');
        form.addEventListener("submit", registerUser);
        return () => {
            form.removeEventListener("submit", registerUser);
        };
    })

    return (
        <div>
            <h1>Registration</h1>
            <form id="reg-form">
                <label htmlFor="username">Login </label>
                <input autoComplete='off' id="username"></input>
                <br />
                <label htmlFor="email">Email </label>
                <input autoComplete='off' id="email"></input>
                <br />
                <label htmlFor="password">Password </label>
                <input autoComplete='off' type="password" id="password"></input>
                <br />
                <label htmlFor="password2">Password again </label>
                <input autoComplete='off' type="password" id="password2"></input>
                <br />
                <input type="submit" className='button' value="Send" />
            </form>

            <br />
            <Link to="/login" className="button">Login</Link>
        </div>
    );
}

export default RegistrationPage;
