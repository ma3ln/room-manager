import React from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import "../CSS/Popup/RoomInformation.css";
import {DeleteButton} from "../Button/DeleteButton";

"../Button/DeleteButton"
import {AssignmentTurnedIn} from "@mui/icons-material";



// @ts-ignore
const RoomInformation = ({ onBookedRoomItem, onSelectedReservation}) => {

    const [bookedRoom, setBookedRoom] = React.useState({ID: '', Name: '', StartTime: '', EndTime: '', Date: '', Capacity: '', Attribut: '', Haus: '', Ebene: '', Class: '', Modul: ''})

    const [startTime, setStartTime] = React.useState<Dayjs | null>(

    )

    const [date, setDate] = React.useState<Dayjs | null>(

    )

    const [endTime, setEndTime] = React.useState<Dayjs | null>(

    )

    function handleStartTimeChange(newValue: Dayjs | null) {
        setStartTime(newValue);
    }

    function handleEndTimeChange(newValue: Dayjs | null) {
        setEndTime(newValue);
    }

    function handleDateChange(newValue: Dayjs | null) {
        setDate(newValue);
    }

    function handleSelectedClass(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSelectedClass({className: e.target.value})
    }

    const [selectedClass, setSelectedClass] = React.useState({className: ''})

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


    return(
        <div id="roomBookingInformation">
            <div id="bodyForBooking">
                {onBookedRoomItem.map((bookedRoom: {_id: string; name: string}) => (
                        <div id="headBookingInfoPopup" key={bookedRoom._id}>
                            <h4 id="bookingRoomId">{onSelectedReservation._id}</h4>
                            <h1 id="bookingRoomName">{bookedRoom.name}</h1>
                        </div>
                ))}
                <div id="bookingInfoPreSelected">
                    {onBookedRoomItem.map((selecBRoom: {_id: string, capacity: number, attribut: string, haus: string, ebene: number}) => (
                        <div id="leftBookingInfoPopup" key={selecBRoom._id}>
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="dashboardBookingRoomCapacity"
                                disabled
                                label="Kapazität"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={selecBRoom.capacity}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="dashboardBookingRoomAttribut"
                                disabled
                                label="Attribut"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={selecBRoom.attribut}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="dashboardBookingRoomHaus"
                                disabled
                                label="Haus"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={selecBRoom.haus}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="dashboardBookingRoomEbene"
                                disabled
                                label="Ebene"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={selecBRoom.ebene}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    ))}
                        <div id="rightBookingInfoPopup" key={onSelectedReservation._id}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <DesktopDatePicker
                                    label="Datum"
                                    className="rightBoxesRoomBooking"
                                    inputFormat="MM/DD/YYYY"
                                    disabled
                                    onChange={handleDateChange}
                                    value={dayjs(onSelectedReservation.date, "MM/DD/YYYY")}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomDate"
                                />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    label="Start Time"
                                    className="rightBoxesRoomBooking"
                                    onChange={handleStartTimeChange}
                                    disabled
                                    inputFormat="hh:mm"
                                    value={dayjs(onSelectedReservation.startTime, "hh:mm")}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomStartTime"/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    label="End Time"
                                    className="rightBoxesRoomBooking"
                                    inputFormat="hh:mm"
                                    disabled
                                    onChange={handleEndTimeChange}
                                    value={dayjs(onSelectedReservation.endTime, "hh:mm")}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomEndTime"/>}
                                />
                            </LocalizationProvider>
                        </div>
                </div>
                    <div id="classSelection" key={onSelectedReservation._id}>
                        <TextField
                            className="classBoxes"
                            label="Klasse"
                            disabled
                            id="dashboardSelectClass"
                            defaultValue={onSelectedReservation.class}
                            onChange={ (e) => {handleSelectedClass(e)}}
                            sx={{width: '40%'}}
                        >
                        </TextField>
                        <TextField
                            disabled
                            className="classBoxes"
                            defaultValue={onSelectedReservation.module}
                            label="Modul"
                            id="dashboardSelectModul"
                            sx={{width: '40%'}}
                        >
                        </TextField>
                    </div>

                <DeleteButton />
            </div>
        </div>
    )
}

export default RoomInformation;