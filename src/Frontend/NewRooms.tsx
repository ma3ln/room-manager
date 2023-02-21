import React, {MouseEvent, useCallback, useEffect} from "react";
import "./CSS/App/NewRooms.css";
import {Button, IconButton, Menu, MenuItem, Toolbar, Tooltip} from "@mui/material";
import {PersonAddAlt, Category, HouseSiding} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import Popup from "reactjs-popup";
import RoomInformation from "./Popup/RoomInformation";
import {useNavigate} from "react-router-dom";

import haus from"./resources/haus.json";
import attributes from"./resources/attributes.json";
import location from "./resources/location.json";
import ebene from "./resources/ebene.json";
import rooms from "./resources/rooms.json";


function NewRooms() {


    const username = "TestUser!";
    let newId: string;
    let bookingID;
    /*
    let bookingName;
    let bookingLocation;
    let bookingCapacity;
    let bookingAttribut;
    let bookingHaus;
    let bookingEbene; */
    const [loadedRooms, setLoadedRooms] = React.useState([{ID: "", Name: "", }]);
    //const [bookingInfoData, setBookingInfoData] = React.useState({name: '', capacity: 1, attribut: '', location: '', haus: '', ebene: 1});
    const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null)
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
/*
    function saveSelectedRoomData(name: string) {
        for ( let i = 0; i< rooms.length; i++) {
            if(name === rooms[i].name) {
                bookingName = rooms[i].name;
                bookingLocation = rooms[i].location;
                bookingCapacity = rooms[i].capacity;
                bookingAttribut = rooms[i].attribut;
                bookingHaus = rooms[i].haus;
                bookingEbene = rooms[i].ebene;
                setBookingInfoData({
                    location: bookingLocation,
                    attribut: bookingAttribut, capacity: bookingCapacity, ebene: bookingEbene, haus: bookingHaus, name: bookingName})
            }
        }
    }
*/
    useEffect(() => {
        fetch("http://localhost:8081/newrooms")
            .then((response) => response.json())
            .then((data) => setLoadedRooms(data))
    }, [])


    function filterRooms() {
        // filter through set filters of Attribut/Capacity/Location/Haus/Ebene
        let newFilteredRooms = rooms.filter(newRooms => {
            return newRooms.capacity <= parseInt((document.getElementById("numberPeopleInRoom")! as HTMLInputElement).value) &&
                newRooms.attribut === ((document.getElementById("roomAttributes")! as HTMLInputElement).innerHTML) &&
                newRooms.location === ((document.getElementById("location")! as HTMLInputElement).innerHTML) &&
                newRooms.haus === ((document.getElementById("building")! as HTMLInputElement).innerHTML) &&
                newRooms.ebene === parseInt((document.getElementById("floor")! as HTMLInputElement).innerHTML);
        });
        console.log(newFilteredRooms)
/*
        let filterTimeAndDate = newFilteredRooms.filter((attributeFilteredRoom) => {
            if (attributeFilteredRoom.booked.some(({ date }) => (dayjs(date, "MM/DD/YYYY") === dayjs((document.getElementById("date")! as HTMLInputElement).value, "MM/DD/YYYY")))) {
                var startAndEndFilterBetween = attributeFilteredRoom.booked.some(({ startTime, endTime }) => (dayjs((document.getElementById("startTime")! as HTMLInputElement).value, "hh:mm")).isAfter(dayjs(startTime, "hh:mm"))
                    && (dayjs((document.getElementById("endTime")! as HTMLInputElement).value, "hh:mm")).isBefore(dayjs(endTime, "hh:mm")))
                var startFilter = attributeFilteredRoom.booked.some(({ startTime, endTime }) => (dayjs((document.getElementById("startTime")! as HTMLInputElement).value, "hh:mm")).isAfter(dayjs(startTime, "hh:mm"))
                    && (dayjs((document.getElementById("startTime")! as HTMLInputElement).value, "hh:mm")).isBefore(dayjs(endTime, "hh:mm")))
                var endFilter = attributeFilteredRoom.booked.some(({ endTime }) => (dayjs((document.getElementById("startTime")! as HTMLInputElement).value, "hh:mm")).isAfter(dayjs(endTime, "hh:mm"))
                    && (dayjs((document.getElementById("endTime")! as HTMLInputElement).value, "hh:mm")).isBefore(dayjs(endTime, "hh:mm")))
                var startAndEndFilterBeforeAndAfter = attributeFilteredRoom.booked.some(({ startTime, endTime }) => (dayjs((document.getElementById("startTime")! as HTMLInputElement).value, "hh:mm")).isBefore(dayjs(startTime, "hh:mm"))
                    && (dayjs((document.getElementById("endTime")! as HTMLInputElement).value, "hh:mm")).isAfter(dayjs(endTime, "hh:mm")))
                if(startFilter && startAndEndFilterBetween && startAndEndFilterBeforeAndAfter && endFilter) {
                    return null;
                }
                return attributeFilteredRoom
            }
            return attributeFilteredRoom
        }) */
    }




    return(

                <div className="contentNewRooms">
                    <div id="contentBoxesNewRooms">
                        <div id="newBuchungen">
                            <div id="textNeueBuchungen">
                                <h1>Neue Raumbuchung</h1>
                            </div>
                            <div id="newRoomInput">
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
                                                {location.map((option) => (
                                                    <MenuItem key={option.location} value={option.location}>
                                                        {option.location}
                                                    </MenuItem>
                                                ))}
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
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                    <DesktopDatePicker  disablePast className="date" label="Datum" inputFormat="MM/DD/YYYY" onChange={handleDateChange} value={date} renderInput={(params) => <TextField id="date" {...params} sx={{width: '100%'}} />} />
                                                </LocalizationProvider>
                                            </div>
                                            <div className="rightBoxFilter">
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                    <TimePicker
                                                        minTime={dayjs("08:00", "hh:mm")}
                                                        maxTime={dayjs("17:00", "hh:mm")}
                                                        label="Start Time"
                                                        className="startTime"
                                                        onChange={handleStartTimeChange}
                                                        value={startTime}
                                                        renderInput={(params) => <TextField id="startTime" {...params} sx={{width: '100%'}}/>}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div className="rightBoxFilter">
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                    <TimePicker
                                                        minTime={dayjs("10:00", "hh:mm")}
                                                        maxTime={dayjs("18:00", "hh:mm")}
                                                        label="End Time"
                                                        className="endTime"
                                                        onChange={handleEndTimeChange}
                                                        value={endTime}
                                                        renderInput={(params) => <TextField id="endTime" {...params} sx={{width: '100%'}}/>}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="boxFilterButton">
                                    <Button onClick={filterRooms} id="buttonRoomFilter" variant="contained" sx={{width: '50%', backgroundColor: '#365D73'}}>Nach Raum filtern</Button>
                                </div>
                            </div>
                        </div>
                        <div id="newBuchungenBoxes" >
                            <ul id="buchungRaumColumns">
                                {loadedRooms.map((loadedRoom) => (
                                    <li id="raum" key={loadedRoom.ID} onClick={event => {setOpenRoomPopup(true); handleBackgroundBlur()}}>
                                        <div id="headerWithRoomTitle">
                                            <h3 id="textRoomName">{loadedRoom.Name}</h3>
                                        </div>
                                        <div className="informationRoomInList ">
                                            <div>
                                                <PersonAddAlt />
                                                <p className="informationTextForRoomInList">Kapazität: {}</p>
                                            </div>
                                            <div>
                                                <Category />
                                                <p className="informationTextForRoomInList">{}</p>
                                            </div>
                                            <div>
                                                <HouseSiding />
                                                <p className="informationTextForRoomInList">Hausflur: {}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div id="modal">
                                <Popup open ={openRoomPopup}  closeOnDocumentClick={false}>
                                    <RoomInformation onBookingRoomItem={loadedRooms} />
                                    <div id="clickToCloseRoomBooking">
                                        <Button onClick={() => {closeRoomPopup(); handleNoBlurBackground()}} >Close</Button>
                                    </div>
                                </Popup>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default NewRooms;