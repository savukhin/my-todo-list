import React, { Component } from 'react';
import $ from "jquery";

class ChangePasswordPage extends Component {
    changePassword(event) {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const req = {
            newPassword: password,
            token: localStorage.getItem('token')
        }
        console.log(`sending`, req);

        fetch('/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then (res => res.json())
            .then(res => {
                console.log(res);
                if (res.status == 'ok') {
                    console.log(`Got the token: `, res.data);
                } else {
                }
            });
    }

    componentDidMount() {
        this.form = document.getElementById('change-password');
        this.form.addEventListener("submit", this.changePassword);
    }

    componentWillUnmount() {
        this.form.removeEventListener("submit", this.changePassword);
    }

    render() {
        return (
            <div>
                <h1>Change Passoword</h1>
                <form id="change-password">
                    <label htmlFor="password">Password </label>
                    <input autoComplete='off' type="password" id="password"></input>
                    <br />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        );
    }
}

export default ChangePasswordPage;
