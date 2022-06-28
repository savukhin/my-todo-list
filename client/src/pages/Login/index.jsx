import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const navigator = useNavigate();
    const [ errors, setErrors ] = useState(null);

    useEffect(() => {
        document.title = "Login";
    }, []);

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
        
        .then(res => res.json())
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                localStorage.setItem('token', res.token);
                navigator('/');
                navigator(0);
            } else {
                console.log(res);
                setErrors(res.errors);
            }
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
            
            {
                errors &&
                <>
                    { errors.map((error, key) => 
                        <div key={key}>
                            <span className='warning'>
                                { error.msg }
                            </span>
                            <br/>
                        </div>
                    ) }
                    <br/>
                </>
            }

            <Link to="/reg" className="button">Register</Link>
        </div>
    );
}

export default LoginPage;
