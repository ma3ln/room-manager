import "./CSS/Dashboard.css"
import "./CSS/DashboardBuchungen.css"
import React, {useState} from "react";
import {AppBar, Button, IconButton, List, ListItem} from "@mui/material";
import {Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import {QuestionMark} from "@mui/icons-material";
import {AssignmentTurnedIn} from "@mui/icons-material";

function Dashboard(){

//    const [ name, date ] = props;
    const menuSettings = [''];
    const accountSettigns = ['Profile', 'Logout'];
//    const username = (document.getElementById("input-with-account-icon")! as HTMLInputElement).value;
    const username = "TestUser!";
    const styles = {
        toolbarButtons: {
            marginLeft: 'auto',
        },
    };

    const user = [
        {
            "vorname": "Katja",
            "nachname": "Imagine",
            "email": "katja.imagine@gmail.com",
            "role": "Lehrer"
        }
    ]

    const buchung =
            [
                {
                    "id": "001",
                    "name": "R66",
                    "date": "Random Date",
                    "time-start": "12:00",
                    "time-end": "13:00"
                },
                {
                    "id": "002",
                    "name": "A654",
                    "date": "Random Date",
                    "time-start": "11:00",
                    "time-end": "16:00"
                },
                {
                    "id": "003",
                    "name": "A061",
                    "date": "Random Date",
                    "time-start": "15:00",
                    "time-end": "17:30"
                },
                {
                    "id": "004",
                    "name": "R001",
                    "date": "Random Date",
                    "time-start": "09:00",
                    "time-end": "11:00"
                }
            ]


    function handlePopupBuchung() {

    }

    // @ts-ignore
    return(
        <div className="Dashboard">
            <AppBar className="header">
                <div className="verticalLine1"></div>
                <Toolbar>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            sx={{position: 'relative', mr: 2, justifyContent: 'center'}}
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
                        <Button sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}} id="usernameToolbar" color="inherit" startIcon={<AccountCircle />}>{username}</Button>
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
                <div id="contentBoxes">
                    <div id="personal-information">
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
                    <div id="buchungenDiv">
                        <div id="boxTitleBuchungen">
                            <h2 id="titleBuchungen">Buchungen</h2>
                        </div>
                        <div className="list-group">
                            <ul id="listBuchungen">
                                {buchung.map((data) => (
                                    <li id="oneBuchungItem" key={data.id} onClick={handlePopupBuchung}>
                                        <AssignmentTurnedIn />
                                        <span><strong>{data.name}</strong></span>
                                        <p>Date: {data.date}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;