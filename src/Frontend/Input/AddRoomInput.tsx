import TextField from "@mui/material/TextField";
import attributes from "../resources/attributes.json";
import {MenuItem} from "@mui/material";
import location from "../resources/location.json";
import haus from "../resources/haus.json";
import ebene from "../resources/ebene.json";
import React, {useState} from "react";

export function AddRoomInput() {

    const [house, setSelectedHaus] = useState('');
    const [loc, setSelectedLoc] = useState('');
    const [attribut, setSelectedAttribut] = useState('');
    const [floor, setSelectedFloor] = useState('');
    const [myError, setMyError] = React.useState(false);

    function handleHausChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedHaus(event.target.value);
        }
    }

    function handleLocationChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedLoc(event.target.value);
        }
    }

    function handleAttributesChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedAttribut(event.target.value);
        }
    }

    function handleFloorChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedFloor(event.target.value);
        }
    }


    return (
        <div id="attributeFilters">
            <div id="leftAttributes">
                <TextField
                    label="Raum Name"
                    id="newRoomName"
                    error={myError}
                    sx={{width: '80%', marginBottom: '3%'}}
                ></TextField>
                <TextField
                    label="Raum Attribut"
                    select
                    error={myError}
                    value={attribut}
                    onChange={handleAttributesChange}
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
                    error={myError}
                    sx={{width: '80%', marginBottom: '3%'}}
                ></TextField>
            </div>
            <div id="rightAttributes">
                <TextField
                    label="Location"
                    id="newRoomLocation"
                    error={myError}
                    onChange={handleLocationChange}
                    select
                    value={loc}
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
                    error={myError}
                    value={house}
                    onChange={handleHausChange}
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
                    error={myError}
                    value={floor}
                    onChange={handleFloorChange}
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
    );
}

export default AddRoomInput;