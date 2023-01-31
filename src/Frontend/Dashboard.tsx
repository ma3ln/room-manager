import "./CSS/Dashboard.css"
import React from "react";
import {AppBar, IconButton} from "@mui/material";
import {Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {MenuItem} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebars from "./Sidebars";

function Dashboard(){
    return(
        <div className="Dashboard">
            <AppBar className="header">
                <div className="verticalLine"></div>
                <Toolbar>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2}}
                        >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>

            </AppBar>
            <div className="sidebar">
                <div id="SidebareDashboard">
                    <Sidebars />
                </div>
            </div>
            <div className="content"></div>
        </div>
    );
}

export default Dashboard;