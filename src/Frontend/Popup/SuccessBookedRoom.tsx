import React from "react";
import "../CSS/Popup/SuccessAddedRoom.css";
import Box from "@mui/material/Box";
import {CheckCircleRounded} from "@mui/icons-material";

function SuccessBookedRoom() {
    return (
        <Box className="popoverSuccessAdd">
            <CheckCircleRounded sx={{ fontSize: '400%', color: '#32CD32' }}/>
            <h1 id="successAddRoomTitle">Success!!</h1>
        </Box>
    );
}

export default SuccessBookedRoom