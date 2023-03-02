import React from "react";
import "../CSS/Popup/FailureRoomAddInput.css"
import Box from "@mui/material/Box";
import {ReportRounded} from "@mui/icons-material";

function WrongLogin() {
    return (
        <Box className="popoverFailureAdd">
            <ReportRounded sx={{ fontSize: '400%', color: '#FF0000' }}/>
            <h1 id="failureLoginRoom">Fail!!</h1>
            <p>Can't Login without a password or a username</p>
        </Box>
    );
}

export default WrongLogin