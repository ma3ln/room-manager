import React, {Suspense, useEffect, useState} from "react";
import "./CSS/App/NewRooms.css";
import {Button, MenuItem} from "@mui/material";
import {PersonAddAlt, Category, HouseSiding} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import Popup from "reactjs-popup";
import {useNavigate} from "react-router-dom";

import haus from"./resources/haus.json";
import attributes from"./resources/attributes.json";
import location from "./resources/location.json";
import ebene from "./resources/ebene.json";

const RoomInformation = React.lazy(() => import("./Popup/RoomInformation"))


function NewRooms() {

    const [loadedRooms, setLoadedRooms] = React.useState([]);
    const [selectedRoom, setSelectedRoom] = React.useState([]);
    const [disabled, setDisabled] = React.useState(true);
    const [openRoomPopup, setOpenRoomPopup] = React.useState(false);
    const closeRoomPopup = () => setOpenRoomPopup(false);


    const navigate = useNavigate();

    console.log(localStorage.getItem("isLoggedIn"))

    function handleLoad() {
        if(localStorage.getItem("isLoggedIn") !== "1") {
            navigate("/")
            window.location.reload();
        }
    }

    useEffect(() => {
        fetch("http://localhost:8081/getroom")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(loadedRooms => {
                console.log("LoadedRoom", loadedRooms);
                console.log(loadedRooms[0].name)
                console.log(loadedRooms.map((room: { name: string; _id: string }) =>
                    room._id
                ))
                console.log(loadedRooms[1]._id);
                console.log(loadedRooms.filter((room: { name: any; }) =>
                    room.name === "R20"
                ))
                setLoadedRooms(loadedRooms)
            })
            .catch(error => {
                console.error(error);
            });
        }, []);



    setInterval(() => {
        handleLoad();
    }, 10);


    function handleAbleEndTimePicker() {
        setDisabled(false);
        console.log(disabled)
    }

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

    function handleStartTimeChange(newValue: Dayjs | null | undefined) {
        setStartTime(newValue);
    }

    function handleEndTimeChange(newValue: Dayjs | null | undefined) {
        setEndTime(newValue);
    }

    function handleDateChange(newValue: Dayjs | null | undefined) {
        setDate(newValue);
    }

    function SelectedRoom(room: { _id: string; name: string; capacity: number; attribut: string; location: string }) {
        setSelectedRoom(loadedRooms.filter((selecRoom: { _id: string }) => (
            selecRoom._id === room._id
        )))
        console.log(room._id)
        console.log(selectedRoom)
    }

    function filterRooms() {

        var capacity = (document.getElementById("numberPeopleInRoom")! as HTMLInputElement).value

        console.log(capacity)
        console.log(attribut)
        console.log(loc)
        console.log(house)
        console.log(floor)

        const formdata = new FormData();
        formdata.append("capacity", capacity)
        formdata.append("attribut", attribut)
        formdata.append("location", loc)
        formdata.append("house", house)
        formdata.append("floor", floor)

        console.log(formdata)

        fetch("http://localhost:8081/filterroom", {
            method: 'POST',
            body: formdata,
        })
            .then(response => {
                console.log("result", response)
            })
            .catch(error => {
                console.log("Error", error)
            });
    }

    const [house, setSelectedHaus] = useState('');
    const [loc, setSelectedLoc] = useState('');
    const [attribut, setSelectedAttribut] = useState('');
    const [floor, setSelectedFloor] = useState('');

    function handleHausChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedHaus(event.target.value);
        }
    }

    function handleLocationChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedLoc(event.target.value);
        }
    }

    function handleAttributesChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedAttribut(event.target.value);
        }
    }

    function handleFloorChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedFloor(event.target.value);
        }
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
                                                inputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: "[0, 9]*"
                                                }}
                                            ></TextField>
                                        </div>
                                        <div className="leftBoxFilter">
                                            <TextField
                                                id="roomAttributes"
                                                label="Attribute"
                                                sx={{width: '100%'}}
                                                select
                                                onChange={handleAttributesChange}
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
                                                onChange={handleLocationChange}
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
                                                id="bulding"
                                                label="Haus"
                                                sx={{width: '100%'}}
                                                select
                                                onChange={handleHausChange}
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
                                                onChange={handleFloorChange}
                                            >
                                                {ebene.map((option) => (
                                                    <MenuItem key={option.ebene} defaultValue={"floor"} value={option.ebene}>
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
                                                        label="Start Time"
                                                        className="startTime"
                                                        onChange={(e) => {handleStartTimeChange(e); handleAbleEndTimePicker()}}
                                                        value={startTime}
                                                        renderInput={(params) => <TextField id="startTime" {...params} sx={{width: '100%'}}/>}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div className="rightBoxFilter">
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                    <TimePicker
                                                        disabled={disabled}
                                                        label="End Time"
                                                        className="endTime"
                                                        minTime={dayjs(startTime)}
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
                                {loadedRooms.map((room: {_id: string; name: string; capacity: number; attribut: string; location: string}) => (
                                    <li id={room._id} className="raum" key={room.name} onClick={event => {setOpenRoomPopup(true); handleBackgroundBlur(); SelectedRoom(room)}}>
                                        <div  id="headerWithRoomTitle">
                                            <h3  id="textRoomName">{room.name}</h3>
                                        </div>
                                        <div className="informationRoomInList ">
                                            <div className="roomListAttribut">
                                                <PersonAddAlt />
                                                <p className="informationTextForRoomInList">Kapazität: {room.capacity}</p>
                                            </div>
                                            <div className="roomListAttribut">
                                                <Category />
                                                <p className="informationTextForRoomInList">{room.attribut}</p>
                                            </div>
                                            <div className="roomListAttribut">
                                                <HouseSiding />
                                                <p className="informationTextForRoomInList">Location: {room.location}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Suspense fallback={<div>Loading...</div>}>
                                {openRoomPopup ? <div id="modal">
                                    <Popup open ={openRoomPopup}  closeOnDocumentClick={false}>
                                        <RoomInformation onBookingRoomItem={selectedRoom} />
                                        <div id="clickToCloseRoomBooking">
                                            <Button onClick={() => {closeRoomPopup(); handleNoBlurBackground()}} >Close</Button>
                                        </div>
                                    </Popup>
                                </div>: null}
                            </Suspense>
                        </div>
                    </div>
                </div>
    )
}

export default NewRooms;