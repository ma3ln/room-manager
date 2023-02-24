import React from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import "../CSS/Popup/RoomInformation.css";
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
                {onBookedRoomItem.map((bookedRoom: {_id: string; name: string; capacity: number; attribut: string; location: string, reservations: []}) => (
                    bookedRoom.reservations.map((roomReserv: {_id: string, name: string, date: string, startTime: string, endTime: string}) => (
                        <div id="headBookingInfoPopup" key={roomReserv._id}>
                            <h4 id="bookingRoomId">{roomReserv._id}</h4>
                            <h1 id="bookingRoomName">{roomReserv.name}</h1>
                        </div>
                        ))
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
                    {onBookedRoomItem.map((selecBRoom: {_id: string, reservations: []}) => (
                        <div id="rightBookingInfoPopup" key={selecBRoom._id}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Datum"
                                    disabled
                                    className="rightBoxesRoomBooking"
                                    inputFormat="MM/DD/YYYY"
                                    onChange={handleDateChange}
                                    value={selecBRoom.reservations.filter((dateForRoom: {date: string}) => ( dateForRoom.date))}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomDate"
                                />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Start Time"
                                    disabled
                                    className="rightBoxesRoomBooking"
                                    onChange={handleStartTimeChange}
                                    value={selecBRoom.reservations.filter((startTimeForRoom: {startTime: string}) => ( startTimeForRoom.startTime))}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomStartTime"/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="End Time"
                                    disabled
                                    className="rightBoxesRoomBooking"
                                    onChange={handleEndTimeChange}
                                    value={selecBRoom.reservations.filter((endTimeForRoom: {endTime: string}) => ( endTimeForRoom.endTime))}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomEndTime"/>}
                                />
                            </LocalizationProvider>
                        </div>
                    ))}
                </div>
                {onBookedRoomItem.map((selecBRoom: {_id: string, class: string, module: string}) => (
                    <div id="classSelection" key={selecBRoom._id}>
                        <TextField
                            className="classBoxes"
                            label="Klasse"
                            disabled
                            id="dashboardSelectClass"
                            defaultValue={selecBRoom.class}
                            onChange={ (e) => {handleSelectedClass(e)}}
                            sx={{width: '40%'}}
                        >
                        </TextField>
                        <TextField
                            disabled
                            className="classBoxes"
                            defaultValue={selecBRoom.module}
                            label="Modul"
                            id="dashboardSelectModul"
                            sx={{width: '40%'}}
                        >
                        </TextField>
                    </div>

                ))}
                <div id="clickToDeleteBooking">
                    <Button onClick={deleteRoom} variant="contained">Buchung Löschen</Button>
                </div>
            </div>
        </div>
    )
}

export default RoomInformation;