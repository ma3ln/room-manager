import {Button, Modal} from "@mui/material";
import React, {Suspense} from "react";
import "../CSS/Background/LoaderForRendering.css"
import "../CSS/Button/DeleteButton.css"

const SuccessButton = React.lazy(() => import("../Popup/SuccessRoom"))

export function DeleteButton() {

    const [successDelete, setSuccessDelete] = React.useState(false);

    function deleteRoom() {
        var _id = ((document.getElementById("bookingRoomId")! as HTMLInputElement).innerHTML)

        const formdata = new FormData();
        formdata.append("idToDelete", _id);

        fetch("http://localhost:8081/deleteBooked", {
            method: 'POST',
            body: formdata,
        })
            .then(response => {
                setSuccessDelete(true)
                console.log("result", response)
            })
            .catch(error => {
                console.log("Error", error)
            });
    }

    return (
        <div id="clickToDeleteBooking">
            <Button onClick={deleteRoom} variant="contained">Buchung Löschen</Button>
            <Suspense fallback={<div className="loader"></div>}>
                { successDelete ? <Modal
                    open={successDelete}
                    onClose={() => setSuccessDelete(false)}>
                    <SuccessButton />
                </Modal>: null}
            </Suspense>
        </div>
    );
}