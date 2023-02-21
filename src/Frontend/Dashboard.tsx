import "./CSS/App/Dashboard.css"
import "./CSS/App/DashboardBuchungen.css"
import React, {useEffect, useState} from "react";
import {AssignmentTurnedIn} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import bookedRooms from "./resources/bookedRooms.json"
import Popup from "reactjs-popup";
import RoomInformation from "./Popup/RoomInformation";
import {Button} from "@mui/material";

function Dashboard(){

//    const [ name, date ] = props;

//    const username = (document.getElementById("input-with-account-icon")! as HTMLInputElement).value;
    const username = localStorage.getItem("username");


    /*useEffect(() => {
        const interval = setInterval(() => {
            // @ts-ignore
        }, );

        return () => clearInterval(interval)
    }, []);*/




    const user = [
        {
            "vorname": "Katja",
            "nachname": "Imagine",
            "email": "katja.imagine@gmail.com",
            "role": "Lehrer"
        }
    ]


    function handlePopupBuchung() {

    }

    const navigate = useNavigate();
    const [loadedRooms, setLoadedRooms] = React.useState([{ID: "", Name: "", }]);
    const [openBookingPopup, setOpenBookingPopup] = React.useState(false);
    const closeBookingPopup = () => setOpenBookingPopup(false);
    console.log(localStorage.getItem("isLoggedIn"))

    function handleBackgroundBlur() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'blur(5px)'
    }

    function handleNoBlurBackground() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'none'
    }

    function handleLoad() {
        if(localStorage.getItem("isLoggedIn") !== "1") {
            navigate("/")
            window.location.reload();
        }
    }

    setInterval(() => {
        handleLoad();
    }, 10);

/*
    function handleLogout() {
        localStorage.setItem("isLoggedIn", "null")
        localStorage.setItem("isLoggegIn", "null")
        navigate("/login")
    } */


    return(
                <div className="contentDashboard">
                    <div id="contentBoxes">
                        <div id="personal-information">
                            <div id="personaleInformation">
                                <div id="dashboardWelcome">
                                    <h1>Welcome {username}!</h1>
                                </div>
                                <div id="informationAboutUser">
                                    <div id="picPersonalData"/>
                                    {user.map((user) => (
                                        <>
                                            <div id="boxInformation">
                                                <div id="informationUserName">
                                                    <h2 id="textUserName">{user.vorname}  {user.nachname}</h2>
                                                </div>
                                                <div id="informationEmail">
                                                    <p id="textEmail">{user.email}</p>
                                                </div>
                                                <div id="informationRole">
                                                    <p id="textRole">{user.role}</p>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div id="placeholderStyle">

                            </div>
                        </div>
                        <div id="buchungenDiv">
                            <div id="boxTitleBuchungen">
                                <h2 id="titleBuchungen">Buchungen</h2>
                            </div>
                            <div className="list-group">
                                <ul id="listBuchungen">
                                        {bookedRooms.map((data) => (
                                                <li id="oneBuchungItem" key={data.ID} onClick={event => {setOpenBookingPopup(true); handleBackgroundBlur()}}>
                                                    <AssignmentTurnedIn />
                                                    <span><strong>{data.Name}</strong></span>
                                                    <p>Date: {data.Date}</p>
                                                </li>
                                            ))}
                                </ul>
                                <div id="modal">
                                    <Popup open={openBookingPopup}  closeOnDocumentClick={false}>
                                        <RoomInformation onBookingRoomItem={loadedRooms} />
                                        <div id="clickToCloseRoomBooking">
                                            <Button onClick={() => {closeBookingPopup(); handleNoBlurBackground()}} >Close</Button>
                                        </div>
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

    );
}

export default Dashboard;