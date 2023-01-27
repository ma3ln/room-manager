import React from 'react';
import "./CSS/Login.css";
import {Button} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";

import {Link, useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";
import Register from "./Popup/Register";

function Login() {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);

    function handleClick() {
        navigate("/dashboard");
    }

    function handleLogin() {

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
                    <Button onClick={() => setOpen(true)} className="registerButton" sx={{ width: 300, padding: 1, margin: 2}} variant="outlined">Register</Button>
                </div>
                <div id="modal">
                    <Popup open ={open} closeOnDocumentClick onClose={closeModal}
                    >
                        <Register/>
                    </Popup>
                </div>
            </div>
            <div className="elementLogin">
                <Button onClick={handleLogin} className="loginButton" sx={{ width: 300, padding: 1, margin: 2}} variant="contained">Log In</Button>
            </div>
            <button onClick={handleClick}>Route Test</button>
        </div>
    );
}

export default Login;