import "./CSS/App/Dashboard.css"
import "./CSS/App/DashboardBuchungen.css"
import React, {useEffect, useState} from "react";
import {AssignmentTurnedIn} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import bookedRooms from "./resources/bookedRooms.json"
import Popup from "reactjs-popup";
import RoomInformation from "./Popup/RoomInformation";
import {Button} from "@mui/material";
import BookingInfo from "./Popup/BookingInfo";

function Dashboard(){

//    const [ name, date ] = props;

//    const username = (document.getElementById("input-with-account-icon")! as HTMLInputElement).value;
    const username = localStorage.getItem("username");
    const [loadBookedRooms, setLoadBooked] = React.useState([]);
    const [selectedBookedRoom, setSelectedBookedRoom] = React.useState([]);
    const [error, setError] = React.useState(null);




    const user = [
        {
            "vorname": "Katja",
            "nachname": "Imagine",
            "email": "katja.imagine@gmail.com",
            "role": "Lehrer"
        }
    ]

    useEffect(() => {
        fetch("http://localhost:8081/getBookedRooms")
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
                console.log(loadBookedRooms.map((room: { name: string; _id: string }) => {

                }))
                console.log(loadBookedRooms[0]._id);
                setLoadBooked(loadBookedRooms)
            })
            .catch(error => {
                console.error(error);
                setError(error);
            });
    }, []);

    function handlePopupBuchung() {

    }
    
    function newSelectedRoom(bookedRoom: {_id: string; name: string; capacity: number; attribut: string; location: string, reservations: []}) {
        setSelectedBookedRoom(loadBookedRooms.filter((selecBookedRoom: {_id: string}) => (
            selecBookedRoom._id === bookedRoom._id
        )))
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
                                        {loadBookedRooms.map((bookedRoom: {_id: string; name: string; capacity: number; attribut: string; location: string, reservations: []}) => (
                                                <li id="oneBuchungItem" key={bookedRoom._id} onClick={event => {setOpenBookingPopup(true); handleBackgroundBlur(); newSelectedRoom(bookedRoom)}}>
                                                    <AssignmentTurnedIn />
                                                    <span><strong>{bookedRoom.name}</strong></span>
                                                    <p>Date: {}</p>
                                                </li>
                                            ))}
                                </ul>
                                <div id="modal">
                                    <Popup open={openBookingPopup}  closeOnDocumentClick={false}>
                                        <BookingInfo onBookedRoomItem={selectedBookedRoom} />
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