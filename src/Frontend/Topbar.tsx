import {Button, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountCircle, QuestionMark} from "@mui/icons-material";
import React from "react";
import {useNavigate} from "react-router-dom";
import "./CSS/App/Topbar.css"

export function Topbar() {

    const username = localStorage.getItem("username");
    const navigate = useNavigate();
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
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    sx={{position: 'relative', mr: 2}}
                >
                    <MenuIcon />
                </IconButton>
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
        </div>
    );
}

export default Topbar;