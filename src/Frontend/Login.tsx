import React, {useEffect, useState} from 'react';
import "./CSS/Login.css";
import {Button, Popover} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";
import {Md5} from 'ts-md5';
import {Link, useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";
import Register from "./Popup/Register";
import NoInputError from "./Popup/NoInputError";
import CirclesLogin from "./Background/CirclesLogin";
import Sidebars from "./Sidebars";
import {Simulate} from "react-dom/test-utils";
import WrongLogin from "./Popup/WrongLogin";


function Login() {

    const [postId, setPostId] = useState(0);

    localStorage.setItem("test", "123456")

    const navigate = useNavigate();
    const [openPopup, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [show, setShow] = React.useState(false);
    const [showNoInputError, setShowNoInputError] = React.useState(false);
    const [showWrongLogin, setShowWrongLogin] = React.useState(false);
    const closeModal = () => setOpen(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const openPopover = Boolean(anchorEl);

    function handleClose() {
        localStorage.setItem("isLoggedIn", "null")
        localStorage.setItem("username", "null")
        setShow(prevState => !prevState);
        setShowWrongLogin(false);
        setShowNoInputError(false);
        setAnchorEl(null);
    }

    function handlePopupClose() {
        closeModal();
    }


    function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
        var username = (document.getElementById("input-with-account-icon")! as HTMLInputElement).value
        var password = (document.getElementById("input-with-password-icon")! as HTMLInputElement).value

        console.log(username);
        console.log(password);
        console.log(Md5.hashStr(password));

        const formdata = new FormData();
        formdata.append("user", username);
        formdata.append("password", Md5.hashStr(password));
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
                        localStorage.setItem("isLoggedIn", "1")
                        localStorage.setItem("username", username)
                        navigate("/dashboard");
                    }
                })
                .then(result => {
                    console.log("result", result)
                })
                .catch(error => {
                    if(error.response.status === 400) {
                        setAnchorEl(event.currentTarget);
                        setShowNoInputError(false);
                        localStorage.setItem("isLoggedIn", "null")
                        localStorage.setItem("username", "null")
                        setShow(prevState => !prevState);
                    }
                });
        }
    }

    function handleBackground() {

    }

    return(
        <div className="loginPage">
            <CirclesLogin/>
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
                        {showNoInputError ? < NoInputError/> : <WrongLogin/>  }
                    </Popover>}
                </div>
                <p id="hr-lines">or</p>
                <div className="registerElement">
                    <Button onClick={() => {setOpen(true); handleBackground()}} className="registerButton" sx={{ width: 300, padding: 1, margin: 2}} variant="contained">Register</Button>
                </div>
                <div id="modal">
                    <Popup open ={openPopup} closeOnDocumentClick onClose={closeModal}
                    >
                        <Register/>
                        <div>
                            <Button onClick={handlePopupClose} id="closeRegisterPopup" variant="contained">Close</Button>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    );
}

export default Login;