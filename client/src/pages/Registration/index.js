import React, { Component } from 'react';
import $ from "jquery";

class RegistrationPage extends Component {
    registerUser(event) {
        event.preventDefault();
        var x = document.getElementById('reg-form');
        console.log(x);
        // fetch('/api/register')
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
