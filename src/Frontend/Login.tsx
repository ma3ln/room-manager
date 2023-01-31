import React, {useEffect, useState} from 'react';
import "./CSS/Login.css";
import {Button, Popover} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";

import {Link, useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";
import Register from "./Popup/Register";
import NoInputError from "./Popup/NoInputError";
import Circles from "./Background/Circles";
import Sidebars from "./Sidebars";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {constants} from "http2";
import WrongLogin from "./Popup/WrongLogin";


function Login() {

    const [postId, setPostId] = useState(0);


    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [openPopup, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [show, setShow] = React.useState(false);
    const [showNoInputError, setShowNoInputError] = React.useState(false);
    const [showWrongLogin, setShowWrongLogin] = React.useState(false);
    const closeModal = () => setOpen(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const openPopover = Boolean(anchorEl);

    function handleClick() {
        const formdata = new FormData();
        formdata.append("user", "TestUser1");
        formdata.append("password", "123456");


        fetch("http://localhost:8081/login", {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    function handleClose() {
        setShow(prevState => !prevState);
        setShowWrongLogin(false);
        setShowNoInputError(false);
        setAnchorEl(null);
    }

    function handlePopupClose() {
        closeModal();
    }


    function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
        const formdata = new FormData();
        formdata.append("user", "TestUser1")
        formdata.append("password", "123456")
        if (((document.getElementById("input-with-account-icon")! as HTMLInputElement).value === "") || ((document.getElementById("input-with-password-icon")! as HTMLInputElement).value === "")) {
            setAnchorEl(event.currentTarget);
            setShow(prevState => !prevState);
            setShowNoInputError(prevState => !prevState);
        } else {
            fetch("http://localhost:8081/login", {
                method: 'POST',
                body: formdata,
                redirect: "follow"
                })
                .then(response => {
                    response.text()
                    if(response.ok) {
                        setIsLoggedIn(true);
                        navigate("/dashboard");
                    }
                })
                .then(result => console.log("result", result))
                .catch(error => {console.log('error', error)
                                setShow(true);
                                setShowWrongLogin(true)});
        }
    }

    function handleBackground() {

    }

    return(
        <div className="loginPage">
            <Circles/>
            <div id="SidebareLogin">
                <Sidebars />
            </div>
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
                               type="password"
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
                    {showNoInputError ? < NoInputError/> : showNoInputError ? <WrongLogin/> : <div></div> }
                </Popover>}
            </div>
            <button onClick={handleClick}>Route Test</button>
        </div>
    );
}

export default Login;