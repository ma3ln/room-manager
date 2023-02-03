import "./CSS/Dashboard.css"
import React from "react";
import {AppBar, Button, IconButton} from "@mui/material";
import {Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {MenuItem} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebars from "./Sidebars";
import SidebarBackground from "./Background/SidebarBackground";
import {QuestionMark} from "@mui/icons-material";
import Box from "@mui/material/Box";

function Dashboard(){

    const menuSettings = ['']
    const accountSettigns = ['Profile', 'Logout']
    const username = "Lisa";
    const styles = {
        toolbarButtons: {
            marginLeft: 'auto',
        },
    };

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
                <div id="dashboardWelcome">
                    <h1>Welcome {username}!</h1>
                </div>
                <div id="contentBoxes">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;