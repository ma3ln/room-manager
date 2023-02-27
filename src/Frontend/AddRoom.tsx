import React from "react";
import "./CSS/App/AddRoom.css";


import AddRoomInput from "./Input/AddRoomInput";
import {AddRoomButton} from "./Button/AddRoomButton";

function AddRoom() {


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
                                <AddRoomInput />
                                <AddRoomButton />
                            </div>

                        </div>
                    </div>

                </div>

    );
}

export default AddRoom;