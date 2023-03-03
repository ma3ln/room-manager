import {Button, Modal, Popover} from "@mui/material";
import React, {Suspense} from "react";
import RoomAlreadyExistingRoomError from "../Popup/RoomAlreadyExistingRoomError";

const SuccessRoom = React.lazy(() => import("../Popup/SuccessRoom"))
const NotAllInputAddRoomError = React.lazy(() => import("../Popup/NotAllInputAddRoomError"))
export function AddRoomButton() {

    const [myError, setMyError] = React.useState(false);
    const [noInput, setNoInput] = React.useState(false);
    const [roomAlreadyExisting, setRoomAlreadyExisting] = React.useState(false);
    const [successAdd, setSuccessAdd] = React.useState(false);

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
            setNoInput(true);
            setSuccessAdd(false);
            console.log("Error: You have to put in values")
        } else {
            setMyError(false);
            fetch("http://localhost:8081/addroom", {
                method: 'POST',
                body: formdata,
            })
                .then(response => {
                    if (response.status == 409){
                        console.log("fail100", response)
                        setRoomAlreadyExisting(true);
                    }else{
                        console.log("result", response)
                        setSuccessAdd(true)
                    }
                })
                .catch(error => {
                    console.log("Error", error)
                    setSuccessAdd(false);
                });
        }
    }

    function handleBackgroundBlur() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'blur(5px)'
    }

    function handleNoBlurBackground() {
        (document.getElementById("root")! as HTMLElement).style.filter = 'none'
    }

    function setInputToZero() {
        (document.getElementById("newRoomName")! as HTMLInputElement).setAttribute("value","");
        (document.getElementById("newRoomCapacity")! as HTMLInputElement).setAttribute("value", "");
        (document.getElementById("newRoomAttribut")! as HTMLInputElement).setAttribute("innerHTML", "");
        (document.getElementById("newRoomLocation")! as HTMLInputElement).setAttribute("innerHTML", "");
        (document.getElementById("newRoomHaus")! as HTMLInputElement).setAttribute("innerHTML", "");
        (document.getElementById("newRoomEbene")! as HTMLInputElement).setAttribute("innerHTML", "")
    }

    return (
        <div>
            <div id="addRoomButton">
                <Button onClick={() => {addRoom() ; setInputToZero()}}>Add A New Room</Button>
            </div>
            <Suspense fallback={<div className="loader"></div>}>
                { noInput ? <Modal
                    open={noInput}
                    onClose={() => setNoInput(false)}>
                    <NotAllInputAddRoomError />
                </Modal>   :
                    roomAlreadyExisting ? <Modal
                            open={roomAlreadyExisting}
                            onClose={() => setRoomAlreadyExisting(false)}>
                            <RoomAlreadyExistingRoomError />
                        </Modal>   :
                    successAdd ? <Modal
                        open={successAdd}
                        onClose={() => setSuccessAdd(false)}
                        >
                    <SuccessRoom />
                </Modal>: null}
            </Suspense>
        </div>
    );
}

export default AddRoomButton;