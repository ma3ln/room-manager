import React from "react";
import Box from "@mui/material/Box";
import "../CSS/Popup/SuccessAddedRoom.css"
import {CheckCircleRounded} from "@mui/icons-material";
import {width} from "dom-helpers";

function SuccessAddedRoom() {
    return (
        <Box className="popoverSuccessAdd">
            <CheckCircleRounded sx={{ fontSize: '400%', color: '#32CD32' }}/>
            <h1 id="successAddRoomTitle">Success!!</h1>
        </Box>
    );
}

export default SuccessAddedRoom