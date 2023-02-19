import React, {MouseEvent, useCallback, useEffect} from "react";
import "./CSS/App/NewRooms.css";
import {Button, IconButton, Menu, MenuItem, Toolbar, Tooltip} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountCircle, QuestionMark, PersonAddAlt, Category, HouseSiding} from "@mui/icons-material";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import {Add} from "@mui/icons-material";
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
    let bookingName;
    let bookingLocation;
    let bookingCapacity;
    let bookingAttribut;
    let bookingHaus;
    let bookingEbene;
    const [bookingInfoData, setBookingInfoData] = React.useState({name: '', capacity: 1, attribut: '', location: '', haus: '', ebene: 1});
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

    function handleLogout() {
        localStorage.setItem("isLoggedIn", "null")
        localStorage.setItem("isLoggegIn", "null")
        navigate("/login")
    }
    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorUser(event.currentTarget);
    }

    const handleUserMenuClose = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnchorUser(null)
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

    useEffect(() => {
        console.log( "Updated", bookingInfoData)
    }, [bookingInfoData])


    const bookedTimes = [
        {
            "date": "05/16/2023",
            "startTime": "13:00",
            "endTime": "15:00",
            "booked": [
                {
                    "bool": "no"
                }
            ]
        },
        {
            "date": "09/20/2023",
            "startTime": "15:00",
            "endTime": "16:00 ",
            "booked": [
                {
                    "bool": "yes"
                }
            ]
        },
        {
            "date": "05/16/2023",
            "startTime": "14:00",
            "endTime": "16:00",
            "booked": [
                {
                    "bool": "no"
                }
            ]
        },
        {
            "date": "07/28/2023",
            "startTime": "10:00",
            "endTime": "12:00",
            "booked": [
                {
                    "bool": "yes"
                }
            ]
        }
    ]

    const newBookedTimes: { date: string; startTime: string; endTime: string; }[] = [];

    function testDateAndTime() {
        console.log(dayjs("02/13/2023").format("DD/MM/YYYY"))
        console.log(dayjs("02/13/2023").format("DD/MM/YYYY"))
        if (dayjs("02/13/2023").isSame(dayjs("02/13/2023"))) {
            console.log("comparison between dates is correct")
        } else {
            console.log("comparison between dates is not correct")
        }

        console.log(dayjs("12:00", "hh:mm"))
        console.log(dayjs("10:00", "hh:mm"))
        if (dayjs("12:00", "hh:mm").isAfter(dayjs("10:00", "hh:mm"))) {
            console.log("comparison if time is after is correct")
        } else {
            console.log("comparison if time is after is incorrect")
        }

        console.log(dayjs("10:00", "hh:mm"))
        console.log(dayjs("12:00", "hh:mm"))
        if (dayjs("10:00", "hh:mm").isBefore(dayjs("12:00", "hh:mm"))) {
            console.log("comparison if time is before is correct")
        } else {
            console.log("comparison if time is before is incorrect")
        }
        console.log(dayjs("05/16/2023", "MM/DD/YYYY"))
        for(let i = 0; i < bookedTimes.length; i++) {
            if(bookedTimes.filter(value => value.booked.values.toString() === "yes")) {
                bookedTimes.splice(i, 1)
            }
        }
        console.log(bookedTimes);
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
        })
        console.log(filterTimeAndDate)
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
                        onClick={testDateAndTime}
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
                    <div>
                        <Button onClick={handleUserMenu} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}} id="usernameToolbar" color="inherit" startIcon={<AccountCircle />}>{localStorage.getItem("username")}</Button>
                        <Menu
                            id="menuUser"
                            anchorEl={anchorUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }
                            }
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }
                            }
                            open={Boolean(anchorUser)}
                            onClose={handleUserMenuClose}

                        >
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
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
                                <Tooltip title={" Mich drücken um eine neue Buchung zu erstellen"} placement={"right"} sx={{color: '#bac6ce'}}>
                                    <IconButton onClick={handleNewRoom} id="addNewRoom" sx={{ height: 70, width: 70, padding: 1, margin: '2%', marginLeft: '5%', marginTop: '5%'}} >
                                        <Add sx={{height: '120%', width: '120%'}}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div id="newRoomInput" hidden={true}>
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
                                                    <TimePicker label="Start Time" className="startTime" onChange={handleStartTimeChange} value={startTime} renderInput={(params) => <TextField id="startTime" {...params} sx={{width: '100%'}}/>}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div className="rightBoxFilter">
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                    <TimePicker label="End Time" className="endTIme" onChange={handleEndTimeChange} value={endTime} renderInput={(params) => <TextField id="endTime" {...params} sx={{width: '100%'}}/>}
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
                        <div id="newBuchungenBoxes" hidden={true}>
                            <ul id="buchungRaumColumns">
                                {rooms.map((rooms) => (
                                    <li id="raum" key={rooms.name} onClick={event => {setOpenRoomPopup(true); saveSelectedRoomData(rooms.name); handleBackgroundBlur()}}>
                                        <div id="headerWithRoomTitle">
                                            <h3 id="textRoomName">{rooms.name}</h3>
                                        </div>
                                        <div className="informationRoomInList ">
                                            <div>
                                                <PersonAddAlt />
                                                <p className="informationTextForRoomInList">Kapazität: {rooms.capacity}</p>
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