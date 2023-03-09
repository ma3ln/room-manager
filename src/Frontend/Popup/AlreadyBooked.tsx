import Box from "@mui/material/Box";
import {ReportRounded} from "@mui/icons-material";
import React from "react";
import "../CSS/Popup/FailureRoomAddInput.css"

function AlreadyBooked() {
    return (
        <Box className="popoverFailureAdd">
            <ReportRounded sx={{ fontSize: '400%', color: '#FF0000' }}/>
            <h1 id="failureAddRoom">Fail!!</h1>
            <p>This Room has already been booked at this time</p>
        </Box>
    );
}

export default AlreadyBooked;