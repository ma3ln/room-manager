import React from 'react';
import "./CSS/Login.css";
import Dashboard from "./Dashboard";
import {Link, useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/dashboard");
    }

    return(
        <div className="loginPage">
            <header className="loginHeader">
                <h2>Log In</h2>
            </header>
            <div className="LoginSquare">
                <h4>User</h4>
                <input type="text"/>
                <h4>Password</h4>
                <input type="password"/>
                <hr/>
                <p>or</p>
                <hr/>
                <h5><u>Register</u></h5>
            </div>
            <button onClick={handleClick}>Route Test</button>
        </div>
    );
}

export default Login;