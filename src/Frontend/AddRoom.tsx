import {Button, IconButton, Toolbar, Tooltip} from "@mui/material";
import {MenuItem, Menu} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountCircle, Add, AssignmentTurnedIn, QuestionMark} from "@mui/icons-material";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./CSS/App/AddRoom.css";
import TextField from "@mui/material/TextField";
import attributes from "./resources/attributes.json";
import location from "./resources/location.json";
import haus from"./resources/haus.json";
import ebene from "./resources/ebene.json";
import rooms from "./resources/rooms.json";
import dayjs, {Dayjs} from "dayjs";
import {Md5} from "ts-md5";

function AddRoom() {

    const navigate = useNavigate();
    let booked: [{date: string, startTime: string, endTime: string}] = [{date: "", startTime: "", endTime: ""}]
    const [room, setRoom] = React.useState({id: '', name: '', booked: booked, capacity: 1, attribut: '', location: '', haus: '', ebene: 1})
    const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null)

    function addRoom() {
        var name = ((document.getElementById("newRoomName")! as HTMLInputElement).value)
        var attribut = ((document.getElementById("newRoomAttribut")! as HTMLInputElement).innerHTML)
        var ebene = ((document.getElementById("newRoomEbene")! as HTMLInputElement).innerHTML)
        var haus = ((document.getElementById("newRoomHaus")! as HTMLInputElement).innerHTML)
        var capacity = ((document.getElementById("newRoomCapacity")! as HTMLInputElement).value)
        var location = ((document.getElementById("newRoomLocation")! as HTMLInputElement).innerHTML)



        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("attribut", attribut);
        formdata.append("ebene", ebene);
        formdata.append("haus", haus);
        formdata.append("capacity", capacity);
        formdata.append("location", location);

        if (((document.getElementById("newRoomName")! as HTMLInputElement).value === "")
            || ((document.getElementById("newRoomAttribut")! as HTMLInputElement).innerHTML === "")
            || ((document.getElementById("newRoomEbene")! as HTMLInputElement).innerHTML === "")
            || ((document.getElementById("newRoomHaus")! as HTMLInputElement).innerHTML === "")
            || ((document.getElementById("newRoomCapacity")! as HTMLInputElement).value === "")
            || ((document.getElementById("newRoomLocation")! as HTMLInputElement).innerHTML === "")){
            console.log("Error: You have to put in values")
        } else {
            fetch("http://localhost:8081/addroom", {
                method: 'POST',
                body: formdata,
                redirect: "follow"
            })
                .then(response => {
                    response.text()
                    if(response.ok) {
                        console.log("successfull")
                    }
                })
                .then(result => {
                    console.log("result", result)
                })
                .catch(error => {
                    if(error.response.status === 400) {
                        window.location.reload();
                    }
                });
        }
    }

    function handleLogout() {
        localStorage.setItem("isLoggedIn", "null")
        localStorage.setItem("username", "null")
        navigate("/login")
    }
    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorUser(event.currentTarget);
    }

    const handleUserMenuClose = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnchorUser(null)
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
                                <Tooltip title={"Click me to Add a new Room"} placement={"right"} sx={{color: '#bac6ce'}}>
                                    <IconButton id="addNewRoom" sx={{ height: 70, width: 70, padding: 1, margin: '2%', marginLeft: '5%', marginTop: '5%'}} >
                                        <Add sx={{height: '120%', width: '120%'}}/>
                                    </IconButton>
                                </Tooltip>
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