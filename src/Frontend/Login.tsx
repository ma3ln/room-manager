import React, {useEffect, useState} from 'react';
import "./CSS/Login.css";
import {Button} from "@mui/material";
import {Box} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";

import Dashboard from "./Dashboard";
import {Link, useNavigate} from "react-router-dom";


function Login() {

    const [postId, setPostId] = useState(0);


    const navigate = useNavigate();

    function handleClick() {
/*        //navigate("/dashboard");

        fetch('http://localhost:8081/login', {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({user: 'User123', password: '123456'})
        }).catch((error) => {
            console.log(error)
        });*/
        const formdata = new FormData();
        formdata.append("user", "TestUser1");
        formdata.append("password", "123456");


        fetch("http://localhost:8081/login", {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return(
        <div className="loginPage">
            <header className="loginHeader">
                <h2>Log In</h2>
            </header>
            <div className="LoginSquare">
                <div className="user-login">
                    <TextField id="input-with-account-icon"
                                   label="User"
                                   margin="dense"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="standard"
                    />
                </div>
                <div className="password-login">
                    <TextField id="input-with-password-icon"
                               label="Password"
                               margin="dense"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Lock />
                                       </InputAdornment>
                                   ),
                               }}
                               variant="standard"
                    />
                </div>
                <hr/>
                <p>or</p>
                <hr/>
                <div className="registerElement">
                    <Button className="registerButton" variant="outlined">Register</Button>
                </div>
            </div>
            <div className="elementLogin">
                <Button className="loginButton" variant="contained">Log In</Button>
            </div>
            <button onClick={handleClick}>Route Test</button>
        </div>
    );
}

export default Login;