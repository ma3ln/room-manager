import React from 'react';
import Box from "@mui/material/Box";
import {CheckCircleRounded} from "@mui/icons-material";
import "../CSS/Popup/SuccessRegister.css"

function SuccessLogin() {
    return(
        <Box className="popoverSuccessAdd">
            <CheckCircleRounded sx={{ fontSize: '400%', color: '#32CD32' }}/>
            <h1 id="successAddRoomTitle">Success!!</h1>
        </Box>
    )
}

export default SuccessLogin;