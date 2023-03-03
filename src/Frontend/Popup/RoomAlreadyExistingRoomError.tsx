import "../CSS/Popup/FailureRoomAddInput.css"
import React from "react";
import Box from "@mui/material/Box";
import {ReportRounded} from "@mui/icons-material";

export function NotAllInputAddRoomError() {
    return (
        <Box className="popoverFailureAdd">
            <ReportRounded sx={{ fontSize: '400%', color: '#FF0000' }}/>
            <h1 id="failureAddRoom">Fail!!</h1>
            <p>This Room Name already exists</p>
        </Box>
    );
}

export default NotAllInputAddRoomError;