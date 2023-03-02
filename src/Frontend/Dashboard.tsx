import "./CSS/App/Dashboard.css"
import "./CSS/App/DashboardBuchungen.css"
import React, {Suspense, useEffect, useState} from "react";
import {AssignmentTurnedIn} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import Popup from "reactjs-popup";
import {Button} from "@mui/material";
import UserInformation from "./Page/UserInformation";

const BookingInfo = React.lazy(() => import("./Popup/BookingInfo"))

function Dashboard(){

    const username = localStorage.getItem("username");
    const [loadBookedRooms, setLoadBooked] = React.useState([]);
    const [selectedReservation, setSelectedReservation] = React.useState({_id: "", roomID: "",  name: "", date: "", startTime: "", endTime: "", class: "", module: ""});
    const [selectedBookedRoom, setSelectedBookedRoom] = React.useState([]);


    function fetchBookedRooms() {
        var user = localStorage.getItem("username") as string

        const formdata = new FormData();
        formdata.append("userID", user)

        fetch("http://localhost:8081/getBookedRooms", {
            method: 'POST',
            body: formdata
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(loadBookedRooms => {
                console.log("LoadedRoom", loadBookedRooms);
                console.log(loadBookedRooms[0].name)
                console.log(Object.values(loadBookedRooms[0].reservations))
                console.log(loadBookedRooms.map((room: { name: string; _id: string }) => (
                        room.name
                    )
                ))
                console.log(loadBookedRooms[0]._id);
                setLoadBooked(loadBookedRooms)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchBookedRooms();
    }, []);
    
    function newSelectedRoom(bookedRoom: {_id: string; name: string; capacity: number; attribut: string; location: string, reservations: []}) {
        setSelectedBookedRoom(loadBookedRooms.filter((selecBookedRoom: {_id: string}) => (
            selecBookedRoom._id === bookedRoom._id
        )))
    }

    const navigate = useNavigate();
    const [openBookingPopup, setOpenBookingPopup] = React.useState(false);
    const closeBookingPopup = () => setOpenBookingPopup(false);

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



    return(
                <div className="contentDashboard">
                    <div id="contentBoxes">
                        <div id="personal-information">
                            <div id="personaleInformation">
                                <div id="dashboardWelcome">
                                    <h1 id="welcomeInUserWelcomeText">Welcome</h1>
                                    <h1 id="welcomeUserInfoText">{username}!</h1>
                                </div>
                                <UserInformation />
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
                                        {loadBookedRooms.map((bookedRoom: {_id: string; name: string; capacity: number; attribut: string; location: string, reservations: []}) => (

                                                    bookedRoom.reservations.map((roomReserv: {_id: string, roomID: string,  name: string, date: string, startTime: string, endTime: string, class: string, module: string}) => (
                                                    <li id={roomReserv._id} className="oneBuchungItem" onClick={event => {setOpenBookingPopup(true); handleBackgroundBlur(); newSelectedRoom(bookedRoom); setSelectedReservation(roomReserv)}}>
                                                    <AssignmentTurnedIn />
                                                        <span><strong>{bookedRoom.name}</strong></span>
                                                        <p>{roomReserv.date} {roomReserv.startTime}</p>
                                                    </li>
                                                    ))

                                            ))}
                                </ul>
                                <Suspense fallback={<div>Loading...</div>}>
                                    {openBookingPopup ? <div id="modal">
                                        <Popup open={openBookingPopup}  closeOnDocumentClick={false}>
                                            <BookingInfo onBookedRoomItem={selectedBookedRoom} onSelectedReservation={selectedReservation} />
                                            <div id="clickToCloseRoomBooking">
                                                <Button onClick={() => {closeBookingPopup(); handleNoBlurBackground()}} >Close</Button>
                                            </div>
                                        </Popup>
                                    </div> : null}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>

    );
}

export default Dashboard;