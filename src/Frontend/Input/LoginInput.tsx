import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {AccountCircle, Lock} from "@mui/icons-material";
import React from "react";

export function LoginInput() {


    return (
        <div>
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
                           type="password"
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
    );
}

export default LoginInput