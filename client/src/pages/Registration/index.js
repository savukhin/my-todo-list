import React, { Component } from 'react';
import $ from "jquery";

class RegistrationPage extends Component {
    registerUser(event) {
        event.preventDefault();
        var x = document.getElementById('reg-form');
        console.log(x);
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;
        const req = {
            username,
            password,
            password2
        }
        console.log(req);

        fetch('/api/auth/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then (res => res.json())
            .then(res => console.log(res));
    }

    componentDidMount() {
        this.form = document.getElementById('reg-form');
        this.form.addEventListener("submit", this.registerUser);
    }

    componentWillUnmount() {
        this.form.removeEventListener("submit", this.registerUser);
    }

    render() {
        return (
            <div>
                <h1>Registration</h1>
                <form id="reg-form">
                    <label htmlFor="username">Login </label>
                    <input id="username"></input>
                    <br />
                    <label htmlFor="password">Password </label>
                    <input id="password"></input>
                    <br />
                    <label htmlFor="password2">Password again </label>
                    <input id="password2"></input>
                    <br />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        );
    }
}

export default RegistrationPage;
