import {Button, IconButton, Toolbar} from "@mui/material";
import {MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountCircle, Add, AssignmentTurnedIn, QuestionMark} from "@mui/icons-material";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import React from "react";
import "./CSS/App/AddRoom.css";
import TextField from "@mui/material/TextField";
import attributes from "./resources/attributes.json";
import location from "./resources/location.json";
import haus from"./resources/haus.json";
import ebene from "./resources/ebene.json";
import rooms from "./resources/rooms.json";

function AddRoom() {

    let countingId: number;
    const [room, setRoom] = React.useState({id: '', name: '', kapazitat: '', attribut: '', Location: '', haus: '', ebene: ''})

    function addRoom() {
        countingId = countingId + 1;
        setRoom({Location: ((document.getElementById("newRoomLocation")! as HTMLInputElement).innerHTML),
            attribut: ((document.getElementById("newRoomAttribut")! as HTMLInputElement).innerHTML),
            ebene: ((document.getElementById("newRoomEbene")! as HTMLInputElement).innerHTML),
            haus: ((document.getElementById("newRoomHaus")! as HTMLInputElement).innerHTML),
            id: countingId.toString(),
            kapazitat: ((document.getElementById("newRoomCapacity")! as HTMLInputElement).value),
            name: ((document.getElementById("newRoomName")! as HTMLInputElement).value)})
        if((room.id === "") || (room.haus === "") || (room.ebene === "") || (room.name === "") || (room.kapazitat === "") || (room.Location === "")) {
            console.log("No Attributes for Adding a new Room found")
        } else {
            rooms.push(room)
            console.log(rooms)
        }
    }
    return (
        <div className="layoutAddRoom">
            <div className="headerAddRoom">
                <Toolbar sx={{height: '100%'}} className="toolbar">
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{position: 'relative', mr: 2}}
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
                            sx={{ mr: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
                        >
                            <QuestionMark/>
                        </IconButton>
                        <Button sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}} id="usernameToolbar" color="inherit" startIcon={<AccountCircle />}>{}</Button>
                    </div>
                </Toolbar>
            </div>
            <div className="mainAddRoom">
                <div className="sidebarAddRoom">
                    <div id="SidebareAddRoom">
                        <Sidebars />
                    </div>
                    <div>
                        <SidebarBackground />
                    </div>
                </div>
                <div className="contentAddRoom">
                    <div id="layoutAddRoomContent">
                        <div id="addRoomButton">
                            <div id="textNeuerRaum">
                                <h1>Neuer Raum</h1>
                            </div>
                            <div id="boxNewRoomButton">
                                <IconButton id="addNewRoom" sx={{ height: 70, width: 70, padding: 1, margin: '2%', marginLeft: '5%', marginTop: '5%'}} >
                                    <Add sx={{height: '120%', width: '120%'}}/>
                                </IconButton>
                            </div>
                        </div>
                        <div id="attributesOfNewRoom">
                            <div id="attributeBox">
                                <div id="attributeFilters">
                                    <div id="leftAttributes">
                                        <TextField
                                            label="Raum Name"
                                            id="newRoomName"
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        ></TextField>
                                        <TextField
                                            label="Raum Attribut"
                                            select
                                            id="newRoomAttribut"
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {attributes.map((option, index) => (
                                                <MenuItem key={index} value={option.attribute}>
                                                    {option.attribute}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Kapazität"
                                            id="newRoomCapacity"
                                            type={"number"}
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        ></TextField>
                                    </div>
                                    <div id="rightAttributes">
                                        <TextField
                                            label="Location"
                                            id="newRoomLocation"
                                            select
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {location.map((option, index) => (
                                                <MenuItem key={index} value={option.location}>
                                                    {option.location}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Haus"
                                            id="newRoomHaus"
                                            select
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {haus.map((option, index) => (
                                                <MenuItem key={index} value={option.haus}>
                                                    {option.haus}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Ebene"
                                            id="newRoomEbene"
                                            select
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {ebene.map((option, index) => (
                                                <MenuItem key={index} value={option.ebene}>
                                                    {option.ebene}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={addRoom}>Add A New Room</Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div className="footerAddRoom">

            </div>
        </div>
    );
}

export default AddRoom;