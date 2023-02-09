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
import {useNavigate} from "react-router-dom";
import ReactDOM from "react-dom";


function Dashboard(){

//    const [ name, date ] = props;
    const menuSettings = [''];
    const accountSettigns = ['Profile', 'Logout'];
//    const username = (document.getElementById("input-with-account-icon")! as HTMLInputElement).value;
    const username = localStorage.getItem("username");
    const styles = {
        toolbarButtons: {
            marginLeft: 'auto',
        },
    };



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

    const navigate = useNavigate();

    console.log(localStorage.getItem("isLoggedIn"))

    function handleLoad() {
        if(localStorage.getItem("isLoggedIn") !== "1") {
            navigate("/")
            window.location.reload();
        }
    }

    // if(localStorage.getItem("isLoggedIn") === null){
    //     console.log("hier")
    //     return <div onClick={handleLoad}>test</div>
    // }

    setInterval(() => {
        handleLoad();
    }, 10);


    return(
        <div className="Dashboard">
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
                        <Button id="usernameToolbar" color="inherit" startIcon={<AccountCircle />}>{username}</Button>
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
                        <div>

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