import React from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./CSS/App/FrontPage.css";

function FrontPage() {

    const navigate = useNavigate();

    function handleRoutingLogin() {
        navigate("/login")
    }

    function handleRoutingStudent() {
        navigate("/student")
    }

    return (
        <div id="frontPage">
            <div id="leftIcon">
                <img id="logoFrontPage" src="/roomscape_frontpage_logo.png" alt="Logo"/>
            </div>
            <div id="rightroomscapeToLoginOrStudent">
                <h1 id="appTitle">Roomscape</h1>
                <div id="buttonsToNavigate">
                    <Button variant="contained" sx={{height: '25%', width: '100%', borderRadius: '20px', backgroundColor: '#7890a0'}} onClick={handleRoutingLogin}>Login</Button>
                    <Button variant="contained" sx={{height: '25%', width: '100%', borderRadius: '20px', backgroundColor: '#7890a0'}} onClick={handleRoutingStudent}>Filter Rooms for Student</Button>
                </div>
            </div>
        </div>
    );
}

export default FrontPage;