import React from 'react';
import {Button} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";
import "../CSS/Register.css"

function Register() {

    function handleRegister() {

    }

    return(
        <div id="registerBox">
            <div id="welcome-box">
                <h1 id="welcome">Welcome</h1>
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
                    <div id="user-register">
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
                    <div id="password-register">
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
                </div>
                <div>
                    <Button onClick={handleRegister} id="buttonToRegister" className="registerButton" sx={{ width: 300, padding: 1, margin: 2}} variant="outlined" >Register</Button>
                </div>
            </div>
        </div>

    );
}

export default Register;