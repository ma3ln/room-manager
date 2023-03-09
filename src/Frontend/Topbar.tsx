import {Button, IconButton, Menu, MenuItem, Modal} from "@mui/material";
import {AccountCircle, QuestionMark} from "@mui/icons-material";
import React from "react";
import {useNavigate} from "react-router-dom";
import "./CSS/App/Topbar.css"
import "./CSS/Popup/RoomInformation.css"

const ExplanantionApp = React.lazy(() => import("./Popup/ExplanationApp"));

export function Topbar() {

    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [explanation, setExplanation] = React.useState(false)
    const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null)

    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorUser(event.currentTarget);
    }

    const handleUserMenuClose = () => {
        setAnchorUser(null)
    }



    function handleLogout() {
        localStorage.setItem("isLoggedIn", "null")
        localStorage.setItem("isLoggegIn", "null")
        navigate("/login")
    }


    return (
        <div className="headerDashboard">
                <img src="/roomscape_logo.png" alt="Logo"  width="3%" height="80%" />
                <div id="rightAlignToolbarButtons">
                    <IconButton
                        id="iconButtonHelp"
                        size="large"
                        color="inherit"
                        aria-label="Help"
                        aria-haspopup="true"
                        aria-controls="menu-appbar"
                        onClick={() => setExplanation(true)}
                        sx={{ mr: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
                    >
                        <QuestionMark/>
                    </IconButton>
                    {
                        explanation ? <Modal
                        open={explanation}
                        onClose={()  => setExplanation(false)}>
                            <ExplanantionApp />
                        </Modal> : null
                    }
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
                            open={Boolean(anchorUser)}
                            onClose={handleUserMenuClose}

                        >
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
        </div>
    );
}

export default Topbar;