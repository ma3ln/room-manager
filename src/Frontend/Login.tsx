import React, {Suspense, useState} from 'react';
import "./CSS/App/Login.css";
import {Button, Popover} from "@mui/material";
import {Md5} from 'ts-md5';
import {useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";

import LoginInput from "./Input/LoginInput";
import NoInputError from "./Popup/NoInputError";
import CirclesLogin from "./Background/CirclesLogin";
import WrongLogin from "./Popup/WrongLogin";
const Register = React.lazy(() => import("./Popup/Register"))


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
        window.location.reload();
    }

    function handleBackgroundBlur() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'blur(5px)'
    }

    function handleNoBlurBackground() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'none'
    }


    function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
        var username = (document.getElementById("input-with-account-icon")! as HTMLInputElement).value
        var password = (document.getElementById("input-with-password-icon")! as HTMLInputElement).value

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
                        window.location.reload();
                    }
                });
        }
    }


    return(
        <div className="loginPage">
            <CirclesLogin/>
            <header className="loginHeader">
                <h2 id="headLoginText">Login</h2>
            </header>
            <div className="LoginSquare">
                <LoginInput />
                <div className="elementLogin">
                    <Button onClick={handleLogin} className="loginButton" sx={{ backgroundColor: '#365D73',  width: '45%', padding: 1, margin: 2}} variant="contained">Login</Button>
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
                <p id="hr-lines"></p>
                <div className="registerElement">
                    <Button onClick={() => {setOpen(true); handleBackgroundBlur()}} className="registerButton" sx={{backgroundColor: '#365D73',  width: '45%', padding: 1, margin: 2}} variant="contained">Register</Button>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    {openPopup ? <div id="modal">
                        <Popup open ={openPopup} closeOnDocumentClick={false} onClose={closeModal}
                        >
                            <Register />
                            <div id="clickToCloseRegisterPopup">
                                <Button onClick={() => {closeModal(); handleNoBlurBackground()}}>Close</Button>
                            </div>
                        </Popup>
                    </div>: null}
                </Suspense>
            </div>
        </div>
    );
}

export default Login;