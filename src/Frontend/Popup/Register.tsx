import React from 'react';
import {Button} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";
import "../CSS/Register.css"
import {CirclesRegister} from "../Background/CirclesRegister";

function Register() {

    function handleRegister() {

    }

    return(
        <div id="registerBox">
            <div id="aboutBox">
                <CirclesRegister />
            </div>
            <div id="inputBox">
                <div id="welcome-box">
                    <h1 id="welcome">Create Account</h1>
                </div>
                <div>
                    <div className="inputContainer">
                        <div id="name-register">
                            <TextField id="input-for-first-name"
                                       label="Vorname"
                                       margin="dense"
                                       required
                            />
                            <TextField id="input-forsecond-name"
                                       label="Nachname"
                                       margin="dense"
                                       required
                            />
                        </div>
                        <div id="email-input">
                            <TextField id="input-for-email"
                                       label="E-Mail"
                                       margin="dense"
                                       required
                                       />
                        </div>
                        <div id="user-register">
                            <TextField id="input-with-account-icon-register"
                                       label="User"

                                       margin="dense"
                                       required
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <AccountCircle />
                                               </InputAdornment>
                                           ),
                                       }}
                                       variant="outlined"
                            />
                        </div>
                        <div id="password-register">
                            <TextField id="input-with-password-icon-register"
                                       label="Password"
                                       margin="dense"
                                       required
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <Lock />
                                               </InputAdornment>
                                           ),
                                       }}
                                       variant="outlined"
                            />
                        </div>
                    </div>
                    <div>
                        <Button onClick={handleRegister} id="buttonToRegister" className="registerButton" sx={{ width: 300, padding: 1, margin: 2}} variant="outlined" >Register</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;