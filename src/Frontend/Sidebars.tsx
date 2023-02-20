import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import "./CSS/App/Sidebars.css"
import "./CSS/Background/SidebarBackground.css"
import SidebarBackground from "./Background/SidebarBackground";

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Sidebars() {
    const navigate = useNavigate();

    function handleDashboard() {
        navigate("/dashboard");
    }
    function handleLogin() {
        navigate("/");
    }

    function handleAddRoom() {
        navigate("/addroom")
    }

    function handleNewRooms() {
        navigate("/newrooms");
    }

    const [value, setValue] = React.useState(3);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    return (
        <div id="sidebarDashboard">
            <div>
                <Box
                    sx={{
                        flexGrow: 1,
                        left: '4%',
                        right: '2%',
                        top: '10%',
                        height: '100%',
                        vh: '100%',
                        fontFamily: 'Roboto'
                    }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab onClick={handleDashboard} label="Dashboard" {...a11yProps(0)} />
                        <Tab onClick={handleNewRooms} label="Meine Raumbuchungen" {...a11yProps(1)} />
                        <Tab onClick={handleAddRoom} label="Raumplan" {...a11yProps(2)} />
                        <Tab onClick={handleLogin} label="Login" {...a11yProps(3)} />
                    </Tabs>
                </Box>
            </div>
            <div>
                <SidebarBackground/>
            </div>
        </div>
    );
}