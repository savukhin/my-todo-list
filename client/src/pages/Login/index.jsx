import React, { Component } from 'react';
import $ from "jquery";

class LoginPage extends Component {
    login(event) {
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
        }).then (res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 'ok') {
                    console.log(`Got the token: `, res.data);
                    localStorage.setItem('token', res.data)
                } else {
                }
            });
    }

    componentDidMount() {
        this.form = document.getElementById('login');
        this.form.addEventListener("submit", this.login);
    }

    componentWillUnmount() {
        this.form.removeEventListener("submit", this.login);
    }

    render() {
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
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        );
    }
}

export default LoginPage;
