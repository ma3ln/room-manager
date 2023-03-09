import {Button, Modal} from "@mui/material";
import React, {Suspense} from "react";
import "../CSS/Background/LoaderForRendering.css"
import * as http from "http";

const AlreadyBooked = React.lazy(() => import("../Popup/AlreadyBooked"))
const SuccessRoom = React.lazy(() => import("../Popup/SuccessRoom"))
export function BookRoomButton() {

    const [successBook, setSuccessBook] = React.useState(false);
    const [unsuccessfullBook, setUnsuccessfullBook] = React.useState(false);

    function bookRoom() {
        var user = localStorage.getItem("username") as string
        var roomID = ((document.getElementById("bookingRoomId")! as HTMLInputElement).innerHTML)
        var name = ((document.getElementById("bookingRoomName")! as HTMLInputElement).innerHTML)
        var selectClass = ((document.getElementById("selectClass")! as HTMLInputElement).value)
        var module = ((document.getElementById("selectModul")! as HTMLInputElement).value)
        var date = ((document.getElementById("bookingRoomDate")! as HTMLInputElement).value)
        var startTime =  ((document.getElementById("bookingRoomStartTime")! as HTMLInputElement).value)
        var endTime = ((document.getElementById("bookingRoomEndTime")! as HTMLInputElement).value)

        console.log(roomID)
        const formdata = new FormData();
        formdata.append("username", user);
        formdata.append("roomID", roomID);
        formdata.append("name", name);
        formdata.append("class", selectClass);
        formdata.append("module", module);
        formdata.append("date", date);
        formdata.append("startTime", startTime);
        formdata.append("endTime", endTime);


        fetch("http://localhost:8081/bookRoom", {
            method: 'POST',
            body: formdata,
        })
            .then(response => {
                if (response.ok) {
                    setSuccessBook(true)
                    console.log("result", response)
                } else if (response.status == 404){
                    setUnsuccessfullBook(true);
                }
            })
            .catch(error => {
                console.log("Error", error)
            })
    }

    return (
        <div id="clickToBookRoom">
            <Button onClick={bookRoom} variant="contained">Raum buchen</Button>
            <Suspense fallback={<div className="loader"></div>}>
                { successBook ? <Modal
                    open={successBook}
                    onClose={() => setSuccessBook(false)}>
                    <SuccessRoom />
                </Modal> : unsuccessfullBook ? <Modal
                    open={unsuccessfullBook}
                    onClose={() => setUnsuccessfullBook(false)}>
                        <AlreadyBooked />
                </Modal> : null
                }
            </Suspense>
        </div>
    );
}

export default BookRoomButton