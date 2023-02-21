import {Button, IconButton, Toolbar, Tooltip} from "@mui/material";
import {MenuItem, Menu} from "@mui/material";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./CSS/App/AddRoom.css";
import TextField from "@mui/material/TextField";
import attributes from "./resources/attributes.json";
import location from "./resources/location.json";
import haus from"./resources/haus.json";
import ebene from "./resources/ebene.json";

function AddRoom() {

    /*
    const navigate = useNavigate();
    let booked: [{date: string, startTime: string, endTime: string}] = [{date: "", startTime: "", endTime: ""}]
    const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null)
*/
    function addRoom() {
        var name = ((document.getElementById("newRoomName")! as HTMLInputElement).value)
        var capacity = ((document.getElementById("newRoomCapacity")! as HTMLInputElement).value)
        var attribut = ((document.getElementById("newRoomAttribut")! as HTMLInputElement).innerHTML)
        var location =  ((document.getElementById("newRoomLocation")! as HTMLInputElement).innerHTML)
        var haus = ((document.getElementById("newRoomHaus")! as HTMLInputElement).innerHTML)
        var ebene = ((document.getElementById("newRoomEbene")! as HTMLInputElement).innerHTML)

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("capacity", capacity);
        formdata.append("attribut", attribut);
        formdata.append("location", location);
        formdata.append("haus", haus);
        formdata.append("ebene", ebene);


        if (((document.getElementById("newRoomName")! as HTMLInputElement).value === "")
            || ((document.getElementById("newRoomAttribut")! as HTMLInputElement).innerHTML === "")
            || ((document.getElementById("newRoomEbene")! as HTMLInputElement).innerHTML === "")
            || ((document.getElementById("newRoomHaus")! as HTMLInputElement).innerHTML === "")
            || ((document.getElementById("newRoomCapacity")! as HTMLInputElement).value === "")
            || ((document.getElementById("newRoomLocation")! as HTMLInputElement).innerHTML === "")){
            console.log("Error: You have to put in values")
        } else {
            fetch("http://localhost:8081/addroom", {
                method: 'POST',
                body: formdata,
            })
                .then(response => {
                    console.log("result", response)
                })
                .catch(error => {
                    console.log("Error", error)
                });
        }
    }

    return (
                <div className="contentAddRoom">
                    <div id="layoutAddRoomContent">
                        <div id="addRoomTitle">
                            <div id="textNeuerRaum">
                                <h1>Neuer Raum</h1>
                            </div>
                            <div id="placeholderStyle">

                            </div>
                        </div>
                        <div id="attributesOfNewRoom">
                            <div id="attributeBox">
                                <div id="attributeFilters">
                                    <div id="leftAttributes">
                                        <TextField
                                            label="Raum Name"
                                            id="newRoomName"
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        ></TextField>
                                        <TextField
                                            label="Raum Attribut"
                                            select
                                            id="newRoomAttribut"
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {attributes.map((option, index) => (
                                                <MenuItem key={index} value={option.attribute}>
                                                    {option.attribute}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Kapazität"
                                            id="newRoomCapacity"
                                            type={"number"}
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        ></TextField>
                                    </div>
                                    <div id="rightAttributes">
                                        <TextField
                                            label="Location"
                                            id="newRoomLocation"
                                            select
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {location.map((option, index) => (
                                                <MenuItem key={index} value={option.location}>
                                                    {option.location}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Haus"
                                            id="newRoomHaus"
                                            select
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {haus.map((option, index) => (
                                                <MenuItem key={index} value={option.haus}>
                                                    {option.haus}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Ebene"
                                            id="newRoomEbene"
                                            select
                                            sx={{width: '80%', marginBottom: '3%'}}
                                        >
                                            {ebene.map((option, index) => (
                                                <MenuItem key={index} value={option.ebene}>
                                                    {option.ebene}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div id="addRoomButton">
                                    <Button onClick={addRoom}>Add A New Room</Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

    );
}

export default AddRoom;