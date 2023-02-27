import {Button} from "@mui/material";
import React from "react";
import "../CSS/Button/DeleteButton.css"

export function DeleteButton() {

    function deleteRoom() {
        var _id = ((document.getElementById("bookingRoomId")! as HTMLInputElement).innerHTML)

        const formdata = new FormData();
        formdata.append("idToDelete", _id);

        fetch("http://localhost:8081/deleteBooked", {
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

    return (
        <div id="clickToDeleteBooking">
            <Button onClick={deleteRoom} variant="contained">Buchung Löschen</Button>
        </div>
    );
}