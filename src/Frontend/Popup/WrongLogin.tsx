import React from "react";
import {Typography} from "@mui/material";

function WrongLogin() {
    return (
        <div className="popoverBox">
            <Typography id="errorLogin" sx={{ p : 10}}>Can't Login. Your Password or Username is Wrong</Typography>
        </div>
    );
}

export default WrongLogin