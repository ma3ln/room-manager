import {Typography} from "@mui/material";
import React from "react";

export function NotAllInputAddRoomError() {
    return (
        <div className="popoverBox">
            <Typography id="errorLogin" sx={{ p : 10}}>Du musst alle Felder ausfüllen um einen Raum zu erschaffen</Typography>
        </div>
    );
}

export default NotAllInputAddRoomError;