import React from 'react';
import "./CSS/Login.css";
import {Button, Popover} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";

import {Link, useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";
import Register from "./Popup/Register";
import ErrorLogin from "./Popup/ErrorLogin";
import Circles from "./Background/Circles";

function Login() {

    const navigate = useNavigate();
    const [openPopup, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const closeModal = () => setOpen(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const openPopover = Boolean(anchorEl);

    function handleClick() {
        navigate("/dashboard");
    }

    function handleClose() {
        setShow(prevState => !prevState);
        setAnchorEl(null);
    }

    function handlePopupClose() {
        closeModal();
    }


    function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
        //@ts-ignore
        if ((document.getElementById("input-with-account-icon").value === "") || (document.getElementById("input-with-password-icon").value === "")) {
            setAnchorEl(event.currentTarget);
            setShow(prevState => !prevState);
        }
    }

    function handleBackground() {

    }

    return(
        <div className="loginPage">
            <Circles/>
            <header className="loginHeader">
                <h2>Login</h2>
            </header>
            <div className="LoginSquare">
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
                <p id="hr-lines">or</p>
                <div className="registerElement">
                    <Button onClick={() => {setOpen(true); handleBackground()}} className="registerButton" sx={{ width: 300, padding: 1, margin: 2}} variant="outlined">Register</Button>
                </div>
                <div id="modal">
                    <Popup open ={openPopup} closeOnDocumentClick onClose={closeModal}
                    >
                        <Register/>
                        <div>
                            <Button onClick={handlePopupClose} id="closeRegisterPopup" variant="outlined">Close</Button>
                        </div>
                    </Popup>
                </div>
            </div>
            <div className="elementLogin">
                <Button onClick={handleLogin} className="loginButton" sx={{ width: 300, padding: 1, margin: 2}} variant="contained">Login</Button>
                {show && <Popover
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 0, left: 1000 }}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    open={openPopover}
                    onClose={handleClose}>
                    <ErrorLogin/>
                </Popover>}
            </div>
            <button onClick={handleClick}>Route Test</button>
        </div>
    );
}

export default Login;