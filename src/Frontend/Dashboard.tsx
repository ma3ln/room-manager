import "./CSS/App/Dashboard.css"
import "./CSS/App/DashboardBuchungen.css"
import React, {useEffect, useState} from "react";
import {AppBar, Button, IconButton, List, ListItem, Menu, MenuItem} from "@mui/material";
import {Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import {QuestionMark} from "@mui/icons-material";
import {AssignmentTurnedIn} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import ReactDOM from "react-dom";

import bookedRooms from "./resources/bookedRooms.json"

function Dashboard(){

//    const [ name, date ] = props;
    const menuSettings = [''];
    const accountSettigns = ['Profile', 'Logout'];
    const [listBookedRooms, setListBookedRooms] = useState({});
    const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null)
//    const username = (document.getElementById("input-with-account-icon")! as HTMLInputElement).value;
    const username = localStorage.getItem("username");
    const styles = {
        toolbarButtons: {
            marginLeft: 'auto',
        },
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // @ts-ignore
            const newBookedRoomsObject = JSON.parse(localStorage.getItem("bookedRooms"));
            if (newBookedRoomsObject) {
                setListBookedRooms(newBookedRoomsObject);
            }
        }, 1000);

        return () => clearInterval(interval)
    }, []);




    const user = [
        {
            "vorname": "Katja",
            "nachname": "Imagine",
            "email": "katja.imagine@gmail.com",
            "role": "Lehrer"
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

    setInterval(() => {
        handleLoad();
    }, 10);

    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorUser(event.currentTarget);
    }

    const handleUserMenuClose = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnchorUser(null)
    }

    function handleLogout() {
        localStorage.setItem("isLoggedIn", "null")
        localStorage.setItem("isLoggegIn", "null")
        navigate("/login")
    }


    return(
        <div className="layoutDashboard">
            <div className="headerDashboard">
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
                            <Button onClick={handleUserMenu} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}} id="usernameToolbar" color="inherit" startIcon={<AccountCircle />}>{username}</Button>
                            <Menu
                                id="menuUser"
                                anchorEl={anchorUser}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }
                                }
                                keepMounted
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
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
            <div className="mainDashboard">
                <div className="sidebarDashboard">
                    <div id="SidebareDashboard">
                        <Sidebars />
                    </div>
                    <div>
                        <SidebarBackground />
                    </div>
                </div>
                <div className="contentDashboard">
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
                                        {bookedRooms.map((data) => (
                                                <li id="oneBuchungItem" key={data.ID} onClick={handlePopupBuchung}>
                                                    <AssignmentTurnedIn />
                                                    <span><strong>{data.Name}</strong></span>
                                                    <p>Date: {data.Date}</p>
                                                </li>
                                            ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footerDashboard">

            </div>
        </div>
    );
}

export default Dashboard;