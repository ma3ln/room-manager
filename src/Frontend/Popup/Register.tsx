import React from 'react';
import {Button, Icon} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {AccountCircle} from "@mui/icons-material";
import {Lock} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {ArrowForward} from "@mui/icons-material";
import "../CSS/InputBoxRegister.css";
import "../CSS/AboutBoxRegister.css";
import "../CSS/InputBoxRegister.css";
import "../CSS/AboutBoxRegister.css";
import {Md5} from "ts-md5";

function Register() {

    var activeIndex = 0;
    const flipcard = document.getElementsByClassName("flip-card");

    function handleRegisters() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [show, setShow] = React.useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [showNoInputError, setShowNoInputError] = React.useState(false);

        var activeIndex = 0;
        const flipcard = document.getElementsByClassName("flip-card");
    }

        function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
            var username = (document.getElementById("input-with-account-icon-register")! as HTMLInputElement).value
            var password = (document.getElementById("input-with-password-icon-register")! as HTMLInputElement).value
            var mail = (document.getElementById("input-for-email")! as HTMLInputElement).value
            var firstname = (document.getElementById("input-for-first-name")! as HTMLInputElement).value
            var lastname = (document.getElementById("input-forsecond-name")! as HTMLInputElement).value

            console.log(username);
            console.log(password);
            console.log(Md5.hashStr(password));

            const formdata = new FormData();
            formdata.append("password", Md5.hashStr(password));
            formdata.append("user", username);
            formdata.append("mail", mail);
            formdata.append("lastname", lastname);
            formdata.append("firstname", firstname);

            if (!((document.getElementById(String(username === "" || password === "" || mail === "" || firstname === "" || lastname === ""))))) {
                fetch("http://localhost:8081/register", {
                    method: 'POST',
                    body: formdata,
                    redirect: "follow"
                })
                    .then(response => {
                        response.text()
                    })
                    .then(result => console.log("result", result))
                    .catch(error => {
                        if (error.response.status === 400) {
                            setAnchorEl(event.currentTarget);
                        }
                    });
            } else {
                setAnchorEl(event.currentTarget);
                setShow(prevState => !prevState);
                setShowNoInputError(prevState => !prevState);
            }
        }

        function handleSwipeRight() {

            const nextIndex = activeIndex + 1 <= flipcard.length - 1 ? activeIndex + 1 : 0;


            const currentFlipcard = document.querySelector('[data-index="' + activeIndex + '"]'),
                nextFlipcard = document.querySelector('[data-index="' + nextIndex + '"]');

            //@ts-ignore
            currentFlipcard.dataset.status = "after";

            //@ts-ignore
            nextFlipcard.dataset.status = "become-active-from-before";

            setTimeout(() => {
                //@ts-ignore
                nextFlipcard.dataset.status = "active";

                activeIndex = nextIndex;
            })

        }

        function handleSwipeLeft() {
            const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : flipcard.length - 1;

            const currentFlipcard = document.querySelector('[data-index="' + activeIndex + '"]'),
                nextFlipcard = document.querySelector('[data-index="' + nextIndex + '"]');

            //@ts-ignore
            currentFlipcard.dataset.status = "before";

            //@ts-ignore
            nextFlipcard.dataset.status = "become-active-from-after";

            setTimeout(() => {
                //@ts-ignore
                nextFlipcard.dataset.status = "active";

                activeIndex = nextIndex;
            })
        }

    return (
        <div id="registerBox">
            <div id="aboutBox">
                <div id="welcome-text">
                    <h1 id="aboutBoxWelcome">Welcome!</h1>
                </div>
                <div>
                    <p id="welcome-text">
                        <b>Thank you for considering to use this Application and making an Account. For further
                            information on the people who made this Application, you can hover over the pictures
                            below.</b>
                    </p>
                </div>
                <div className="box-flip-card">
                    <div className="flip-card" id="flip-card-lisa" data-status="active" data-index="0">
                        <div className="flip-card-inner">
                            <div className="flip-card-front" id="flip-front-lisa">
                            </div>
                            <div className="flip-card-back">
                                <h1 className="name">Lisa Hellwage</h1>
                                <p className="devTitle">Developer of Room Manager</p>
                                <p className="devJob">Front-End Lead</p>
                            </div>
                        </div>
                    </div>
                    <div className="flip-card" id="flip-card-marlon" data-status="unknown" data-index="1">
                        <div className="flip-card-inner">
                            <div className="flip-card-front" id="flip-front-marlon">
                            </div>
                                <div className="flip-card-back">
                                    <h1 className="name">Marlon Nobis</h1>
                                    <p className="devTitle">Developer of Room Manager</p>
                                    <p className="devJob">Database Lead <br/>Help for Backend and Front-End</p>
                                </div>
                            </div>
                        </div>
                    <div className="flip-card" id="flip-card-justus" data-status="unknown" data-index="2">
                        <div className="flip-card-inner">
                            <div className="flip-card-front" id="flip-front-justus">
                            </div>
                            <div className="flip-card-back">
                                <h1 className="name">Justus Marx</h1>
                                <p className="devTitle">Developer of Room Manager</p>
                                <p className="devJob">Backend Lead</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swipe-button">
                    <IconButton onClick={handleSwipeLeft} id="swipe-right"
                                sx={{height: 50, width: 50, padding: 1, margin: 2}}>
                        <ArrowBack/>
                    </IconButton>
                    <IconButton onClick={handleSwipeRight} id="swipe-left"
                                sx={{height: 50, width: 50, padding: 1, margin: 2}}>
                        <ArrowForward/>
                    </IconButton>
                </div>
                <div>
                    <a href="https://github.com/ma3ln/room-manager.git">
                        <img id="github" src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
                             alt="Github"/>
                    </a>
                </div>
            </div>
            <div id="inputBox">
                <div id="welcome-box">
                    <h1 id="welcome">Create Account</h1>
                </div>
                <div>
                    <div className="inputContainer">
                        <div id="name-register">
                            <TextField id="input-for-first-name"
                                       label="Vorname"
                                       margin="dense"
                                       sx={{width: '42.5%'}}
                                       required
                            />
                            <TextField id="input-forsecond-name"
                                       label="Nachname"
                                       margin="dense"
                                       sx={{width: '42.5%', marginLeft: 2}}
                                       required
                            />
                        </div>
                        <div id="email-input">
                            <TextField id="input-for-email"
                                       label="E-Mail"
                                       margin="dense"
                                       sx={{width: '88%'}}
                                       required
                            />
                        </div>
                        <div id="user-register">
                            <TextField id="input-with-account-icon-register"
                                       label="User"
                                       sx={{width: '88%'}}
                                       margin="dense"
                                       required
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <AccountCircle/>
                                               </InputAdornment>
                                           ),
                                       }}
                                       variant="outlined"
                            />
                        </div>
                        <div id="password-register">
                            <TextField id="input-with-password-icon-register"
                                       label="Password"
                                       margin="dense"
                                       type="password"
                                       sx={{width: '88%'}}
                                       required
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <Lock/>
                                               </InputAdornment>
                                           ),
                                       }}
                                       variant="outlined"
                            />
                        </div>
                    </div>
                    <div>
                        <Button onClick={handleRegister} id="buttonToRegister" className="registerButton" sx={{ backgroundColor: '#365D73', opacity: 0.8, width: '60%', padding: 1, margin: 2, marginTop: '10%'}} variant="contained" >Register</Button>
                        <Button onClick={handleRegister} id="buttonToRegister" className="registerButton"
                                sx={{width: 300, padding: 1, margin: 2}} variant="contained">Register</Button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Register;

function setAnchorEl(currentTarget: EventTarget & HTMLButtonElement) {
    throw new Error('Function not implemented.');
}
function setShow(arg0: (prevState: any) => boolean) {
    throw new Error('Function not implemented.');
}

function setShowNoInputError(arg0: (prevState: any) => boolean) {
    throw new Error('Function not implemented.');
}

