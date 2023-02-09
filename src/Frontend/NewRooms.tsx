import React from "react";
import "./CSS/NewRooms.css";
import {AppBar, Button, IconButton, MenuItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountCircle, AssignmentTurnedIn, QuestionMark} from "@mui/icons-material";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import {Add} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import {Stack} from "@mui/material";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import Popup from "reactjs-popup";
import RoomInformation from "./Popup/RoomInformation";
import {useNavigate} from "react-router-dom";

function NewRooms() {

    const username = "TestUser!";
    const [openRoomPopup, setOpenRoomPopup] = React.useState(false);
    const closeRoomPopup = () => setOpenRoomPopup(false);
    const attributes = [
        {
            name: 'Tafel'
        },
        {
            name: 'Beamer'
        }
    ]

    const navigate = useNavigate();

    console.log(localStorage.getItem("isLoggedIn"))

    function handleLoad() {
        if(localStorage.getItem("isLoggedIn") !== "1") {
            navigate("/")
            window.location.reload();
        }
    }

    setInterval(() => {
        handleLoad();
    }, 10);

    const rooms = [
        {
            "id": "01",
            "name": "R43",
            "kapazitat": "20",
            "attribut": "Beamer",
            "haus": "6B",
            "ebene": "3"
        },
        {
            "id": "02",
            "name": "R453",
            "kapazitat": "30",
            "attribut": "Tafel",
            "haus": "2B",
            "ebene": "3"
        },
        {
            "id": "03",
            "name": "R60",
            "kapazitat": "5",
            "attribut": "",
            "haus": "3A",
            "ebene": "3"
        },
        {
            "id": "04",
            "name": "R10",
            "kapazitat": "32",
            "attribut": "",
            "haus": "5",
            "ebene": "3"
        },
        {
            "id": "05",
            "name": "R76",
            "kapazitat": "50",
            "attribut": "Tafel",
            "haus": "2",
            "ebene": "3"
        },
        {
            "id": "06",
            "name": "R20",
            "kapazitat": "20",
            "attribut": "Beamer",
            "haus": "6A",
            "ebene": "3"
        },
        {
            "id": "07",
            "name": "R400",
            "kapazitat": "30",
            "attribut": "Tafel",
            "haus": "1A",
            "ebene": "3"
        }
    ]

    const [value, setValue] = React.useState<Dayjs | null>(

    )

    function handleRoomPopupClose() {

    }

    function handleChange(newValue: Dayjs | null) {
        setValue(newValue);
    }

    function handleShowRoomInformation() {

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
        <div id="NewRooms">
            <AppBar className="header">
            <div className="verticalLine1"></div>
            <Toolbar>
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

        </AppBar>
    <div className="sidebar">
        <div id="SidebareDashboard">
            <Sidebars />
        </div>
        <div>
            <SidebarBackground />
        </div>
    </div>
    <div className="content">
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
                                <div id="boxKapazität">
                                    <TextField
                                        id="numberPeopleInRoom"
                                        label="Kapazität"
                                        sx={{width: '105%'}}
                                        type="number"
                                    ></TextField>
                                </div>
                                <div id="boxAttribute">
                                    <TextField
                                        id="roomAttributes"
                                        label="Attribute"
                                        sx={{width: '105%'}}
                                        select
                                    >
                                        {attributes.map((option) => (
                                            <MenuItem key="option.name" value="option.name">
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div>
                                    <TextField
                                        id="building"
                                        label="Haus"
                                        sx={{width: '105%', marginBottom: '2%'}}
                                        select
                                        ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        id="floor"
                                        label="Ebene"
                                        sx={{width: '105%', marginBottom: '2%'}}
                                        select
                                        ></TextField>
                                </div>
                            </div>
                            <div id="rightFilter">
                                <div id="boxDatum">
                                    <div id="dateForRoom">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker label="Datum" inputFormat="MM/DD/YYYY" onChange={handleChange} value={value} renderInput={(params) => <TextField {...params} sx={{width: '60%', maxWidth: '100%'}} />} />
                                        </LocalizationProvider>
                                    </div>
                                    <div id="startTimeForRoom">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker label="Start Time" onChange={handleChange} value={value} renderInput={(params) => <TextField {...params} sx={{width: '60%', maxWidth: '100%'}}/>}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div id="endTimeForRoom">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker label="End Time" onChange={handleChange} value={value} renderInput={(params) => <TextField {...params} sx={{width: '60%', maxWidth: '100%'}}/>}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="boxFilterButton">
                            <Button id="buttonRoomFilter" variant="contained" sx={{ backgroundColor: '#365D73', opacity: 0.8, width: '60%', padding: 1, margin: 2}}>Nach Raum filtern</Button>
                        </div>
                    </div>
                </div>
                <div id="newBuchungenBoxes" hidden={true}>
                    <ul id="buchungRaumColumns">
                        {rooms.map((rooms) => (
                            <li id="raum" key={rooms.id} onClick={() => {setOpenRoomPopup(true)}}>
                                <div id="headerWithRoomTitle">
                                    <h3 id="textRoomName">{rooms.name}</h3>
                                </div>
                                <p>Kapazität: {rooms.kapazitat}</p>
                                <p>Der Raum enthält: {rooms.attribut}</p>
                                <p>Hausflur: {rooms.haus}</p>
                            </li>
                        ))}
                    </ul>
                    <div id="modal">
                        <Popup open ={openRoomPopup} closeOnDocumentClick onClose={closeRoomPopup}
                        >
                            <RoomInformation/>
                            <div>
                                <Button onClick={handleRoomPopupClose} id="closeRoomPopup" variant="contained">Close</Button>
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NewRooms;