import React from 'react';
import "../CSS/App/Login.css";
import {Typography} from "@mui/material";

function NoInputError() {


    return(
        <div className="popoverBox">
            <Typography id="errorLogin" sx={{ p : 10}}>Can't Login. You have to write your Password and your Username</Typography>
        </div>
    )
}

export default NoInputError;