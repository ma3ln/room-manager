import React from 'react';
import "./CSS/Login.css";
import Dashboard from "./Dashboard";
import {Link} from "react-router-dom";

function Login() {
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
            </div>
        </div>
    );
}

export default Login;