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
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";

function NewRooms() {

    const username = "TestUser!";
    const attributes = [
        {
            name: 'Tafel'
        },
        {
            name: 'Beamer'
        }
    ]

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    )

    function handleDateChange(newValue: Dayjs | null) {
        setValue(newValue);
    }

    function handleNewRoom() {
        const filterForRoomDisplay = (document.getElementById("newRoomInput")! as HTMLButtonElement);
        if(filterForRoomDisplay.style.display === 'none') {

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
                <div>
                    <IconButton onClick={handleNewRoom} id="addNewRoom" sx={{ height: 50, width: 50, padding: 1, margin: 2}} >
                        <Add/>
                    </IconButton>
                </div>
                    <div id="newRoomInput">
                        <div id="filterTextBox">
                            <h2 id="filterText">
                                Filter
                            </h2>
                        </div>
                        <div id="boxKapazität">
                            <TextField
                                id="numberPeopleInRoom"
                                label="Kapazität"
                                type="number"
                                ></TextField>
                        </div>
                        <div id="boxAttribute">
                            <TextField
                                id="roomAttributes"
                                label="Attribute"
                                select
                                >
                                {attributes.map((option) => (
                                    <MenuItem key="option.name" value="option.name">
                                        {option.name}
                                    </MenuItem>
                                    ))}
                            </TextField>
                        </div>
                        <div id="boxDatum">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker label="Datum" inputFormat="MM/DD/YYYY" onChange={handleDateChange} value={value} renderInput={(params) => <TextField {...params} />} />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>
            <div id="newBuchungenCalendar"></div>
        </div>
    </div>
    )
}

export default NewRooms;