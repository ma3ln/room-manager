import React from "react";
import "./CSS/App/NewRooms.css";
import {Button, IconButton, MenuItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountCircle, QuestionMark, PersonAddAlt, Category, HouseSiding} from "@mui/icons-material";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import {Add} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import {Dayjs} from "dayjs";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import Popup from "reactjs-popup";
import RoomInformation from "./Popup/RoomInformation";
import {useNavigate} from "react-router-dom";

import haus from"./resources/haus.json";
import attributes from"./resources/attributes.json";
import ebene from "./resources/ebene.json";
import rooms from "./resources/rooms.json";


function NewRooms() {


    const username = "TestUser!";
    let newId: string;
    let bookingID;
    let bookingName;
    let bookingLocation;
    let bookingCapacity;
    let bookingAttribut;
    let bookingHaus;
    let bookingEbene;
    const [bookingInfoData, setBookingInfoData] = React.useState({id: '',name: '', capacity: '', attribut: '', location: '', haus: '', ebene: ''});
    const [openRoomPopup, setOpenRoomPopup] = React.useState(false);
    const closeRoomPopup = () => setOpenRoomPopup(false);

/**
    const haus = require("./resources/haus.json");
    const ebene  = require("./resources/ebene.json");
    const attributes = require("./resources/attributes.json");
    const rooms = require("./resources/rooms.json"); */

    const navigate = useNavigate();

    console.log(localStorage.getItem("isLoggedIn"))

    function handleLoad() {
        if(localStorage.getItem("isLoggedIn") !== "1") {
            navigate("/")
            window.location.reload();
        }
    }
    /**
    function getRooms() {
        fetch("./resources/rooms.json")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        data: result
                    });
                },
                error => {
                    console.log(error)
                }
            )
    } */

    setInterval(() => {
        handleLoad();
    }, 10);

    const [startTime, setStartTime] = React.useState<Dayjs | null>(

    )

    const [date, setDate] = React.useState<Dayjs | null>(

    )

    const [endTime, setEndTime] = React.useState<Dayjs | null>(

    )

    function handleBackgroundBlur() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'blur(5px)'
    }

    function handleNoBlurBackground() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'none'
    }

    function handleStartTimeChange(newValue: Dayjs | null) {
        setStartTime(newValue);
    }

    function handleEndTimeChange(newValue: Dayjs | null) {
        setEndTime(newValue);
    }

    function handleDateChange(newValue: Dayjs | null) {
        setDate(newValue);
    }

    function saveSelectedRoomData(id: string) {
        for ( let i = 0; i< rooms.length; i++) {
            if(id === rooms[i].id) {
                bookingID = rooms[i].id;
                bookingName = rooms[i].name;
                bookingLocation = rooms[i].Location;
                bookingCapacity = rooms[i].kapazitat;
                bookingAttribut = rooms[i].attribut;
                bookingHaus = rooms[i].haus;
                bookingEbene = rooms[i].ebene;
                setBookingInfoData({
                    location: bookingLocation,
                    attribut: bookingAttribut, capacity: bookingCapacity, ebene: bookingEbene, haus: bookingHaus, id: bookingID, name: bookingName})
                console.log(rooms[i].id)
                console.log(rooms[i].haus)
                console.log(rooms[i].name)
                console.log(rooms[i].ebene)
                console.log(rooms[i].attribut)
                console.log(rooms[i].kapazitat)
            }
        }
    }



    function handleNewRoom() {
        const filterForRoomDisplay = (document.getElementById("newRoomInput")! as HTMLDivElement);
        const roomBoxes = (document.getElementById("newBuchungenBoxes")! as HTMLDivElement);
        if(filterForRoomDisplay.style.display === 'none') {
            filterForRoomDisplay.style.display = "flex"
        } else {
            filterForRoomDisplay.style.display = "none"
        }

        if (roomBoxes.style.display === 'none') {
            roomBoxes.style.display = 'block'
        } else {
            roomBoxes.style.display = "none"
        }
    }

    return(
        <div className="layoutNewRooms">
            <div className="headerNewRooms">
            <Toolbar sx={{height: '100%'}} className="toolbar">
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2}}
                >
                    <MenuIcon />
                </IconButton>
                <div id="spaceInToolBar"></div>
                <div id="rightAlignToolbarButtons">
                    <IconButton
                        id="iconButtonHelp"
                        size="large"
                        color="inherit"
                        aria-label="Help"
                        aria-haspopup="true"
                        aria-controls="menu-appbar"
                        sx={{ mr: 2  }}
                    >
                        <QuestionMark/>
                    </IconButton>
                    <Button color="inherit" startIcon={<AccountCircle />}>{username}</Button>
                </div>
            </Toolbar>

        </div>
            <div className="mainNewRooms">
                <div className="sidebarNewRooms">
                    <div id="SidebareDashboard">
                        <Sidebars />
                    </div>
                    <div>
                        <SidebarBackground />
                    </div>
                </div>
                <div className="contentNewRooms">
                    <div id="contentBoxesNewRooms">
                        <div id="newBuchungen">
                            <div id="textNeueBuchungen">
                                <h1>Neue Raumbuchung</h1>
                            </div>
                            <div id="boxNewRoomButton">
                                <IconButton onClick={handleNewRoom} id="addNewRoom" sx={{ height: 70, width: 70, padding: 1, margin: '2%', marginLeft: '5%', marginTop: '5%'}} >
                                    <Add sx={{height: '120%', width: '120%'}}/>
                                </IconButton>
                            </div>
                            <div id="newRoomInput" hidden={true}>
                                <div id="filterTextBox">
                                    <h2 id="filterText">
                                        Filter
                                    </h2>
                                </div>
                                <div id="filter">
                                    <div id="leftFilter">
                                        <div className="leftBoxFilter">
                                            <TextField
                                                id="numberPeopleInRoom"
                                                label="Kapazität"
                                                sx={{width: '100%'}}
                                                type="number"
                                            ></TextField>
                                        </div>
                                        <div className="leftBoxFilter">
                                            <TextField
                                                id="roomAttributes"
                                                label="Attribute"
                                                sx={{width: '100%'}}
                                                select
                                            >

                                                {attributes.map((option) => (
                                                    <MenuItem key={option.attribute} value={option.attribute}>
                                                        {option.attribute}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className="leftBoxFilter">
                                            <TextField
                                                id="location"
                                                label="Location"
                                                sx={{width: '100%'}}
                                                select
                                            >
                                                {}
                                            </TextField>
                                        </div>
                                        <div className="leftBoxFilter">
                                            <TextField
                                                id="building"
                                                label="Haus"
                                                sx={{width: '100%'}}
                                                select
                                            >
                                                {haus.map((option) => (
                                                    <MenuItem key={option.haus} value={option.haus}>
                                                        {option.haus}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className="leftBoxFilter">
                                            <TextField
                                                id="floor"
                                                label="Ebene"
                                                sx={{width: '100%'}}
                                                select
                                            >
                                                {ebene.map((option) => (
                                                    <MenuItem key={option.ebene} value={option.ebene}>
                                                        {option.ebene}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div id="rightFilter">
                                        <div id="boxDatum">
                                            <div className="rightBoxFilter">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker disablePast className="datum" label="Datum" inputFormat="MM/DD/YYYY" onChange={handleDateChange} value={date} renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />} />
                                                </LocalizationProvider>
                                            </div>
                                            <div className="rightBoxFilter">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <TimePicker label="Start Time" onChange={handleStartTimeChange} value={startTime} renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div className="rightBoxFilter">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <TimePicker label="End Time" onChange={handleEndTimeChange} value={endTime} renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="boxFilterButton">
                                    <Button id="buttonRoomFilter" variant="contained" sx={{width: '50%', backgroundColor: '#365D73'}}>Nach Raum filtern</Button>
                                </div>
                            </div>
                        </div>
                        <div id="newBuchungenBoxes" hidden={true}>
                            <ul id="buchungRaumColumns">
                                {rooms.map((rooms) => (
                                    <li id="raum" key={rooms.id} onClick={event => {setOpenRoomPopup(true); saveSelectedRoomData(rooms.id); handleBackgroundBlur()}}>
                                        <div id="headerWithRoomTitle">
                                            <h3 id="textRoomName">{rooms.name}</h3>
                                        </div>
                                        <div className="informationRoomInList ">
                                            <div>
                                                <PersonAddAlt />
                                                <p className="informationTextForRoomInList">Kapazität: {rooms.kapazitat}</p>
                                            </div>
                                            <div>
                                                <Category />
                                                <p className="informationTextForRoomInList">{rooms.attribut}</p>
                                            </div>
                                            <div>
                                                <HouseSiding />
                                                <p className="informationTextForRoomInList">Hausflur: {rooms.haus}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div id="modal">
                                <Popup open ={openRoomPopup}  closeOnDocumentClick={false}>
                                    <RoomInformation onBookingRoomItem={bookingInfoData} />
                                    <div id="clickToCloseRoomBooking">
                                        <Button onClick={() => {closeRoomPopup(); handleNoBlurBackground()}} >Close</Button>
                                    </div>
                                </Popup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footerNewRooms">

            </div>
    </div>
    )
}

export default NewRooms;