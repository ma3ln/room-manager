import React from "react";
import {Button, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";



// @ts-ignore
const RoomInformation = ({ onBookingRoomItem, closeBookingPopup }) => {


    return(
        <div id="roomBookingInformation">
            <div id="headingForBooking">
                <h1>new Booking</h1>
            </div>
            <div id="bodyForBooking">
                <div id="headBookingInfoPopup">
                    <h4>{onBookingRoomItem.id}</h4>
                    <h1>Room: {onBookingRoomItem.name}</h1>
                </div>
                <div id="leftBookingInfoPopup">
                    <TextField
                        disabled
                        id="disabledCapacity"
                        label="Kapazität"
                        defaultValue={onBookingRoomItem.capacity}
                    />
                    <TextField
                        disabled
                        id="disabledAttribute"
                        label="Attribut"
                        defaultValue={onBookingRoomItem.attribut}
                    />
                    <TextField
                        disabled
                        id="disabledHouse"
                        label="Haus"
                        defaultValue={onBookingRoomItem.haus}
                    />
                    <TextField
                        disabled
                        id="disabledFloor"
                        label="Ebene"
                        defaultValue={onBookingRoomItem.ebene}
                    />
                </div>
                <div id="leftBookingInfoPopup">

                </div>
                <Button variant="contained">Raum buchen</Button>
            </div>
            <div>
                <Button onClick={closeBookingPopup.handleRoomPopupClose} id="closeRoomPopup" variant="contained">Close</Button>
            </div>
        </div>
    )
}

export default RoomInformation;