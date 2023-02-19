import React from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import "../CSS/Popup/RoomInformation.css";
import Popup from "reactjs-popup";
import myClass from "../resources/myClass.json";
import bookedRooms from "../resources/bookedRooms.json";



// @ts-ignore
const RoomInformation = ({ onBookingRoomItem}) => {

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

    function bookRoom() {
        setBookedRoom({
            Class: ((document.getElementById("selectClass")! as HTMLInputElement).innerHTML), Modul: ((document.getElementById("selectModul")! as HTMLInputElement).innerHTML),
            Attribut: ((document.getElementById("bookingRoomAttribut")! as HTMLInputElement).value),
            Capacity: ((document.getElementById("bookingRoomCapacity")! as HTMLInputElement).value),
            Date: ((document.getElementById("bookingRoomDate")! as HTMLInputElement).value),
            Ebene: ((document.getElementById("bookingRoomEbene")! as HTMLInputElement).value),
            EndTime: ((document.getElementById("bookingRoomEndTime")! as HTMLInputElement).value),
            Haus: ((document.getElementById("bookingRoomHaus")! as HTMLInputElement).value),
            ID: ((document.getElementById("bookingRoomId")! as HTMLInputElement).innerHTML),
            Name: ((document.getElementById("bookingRoomName")! as HTMLInputElement).innerHTML),
            StartTime: ((document.getElementById("bookingRoomStartTime")! as HTMLInputElement).value)
        })
        if((bookedRoom.ID === "") || (bookedRoom.Class === "") || (bookedRoom.Modul === "") || (bookedRoom.Capacity === "") || (bookedRoom.Date === "") || (bookedRoom.Ebene === "") || (bookedRoom.EndTime === "") || (bookedRoom.Haus === "") || (bookedRoom.Name === "") || (bookedRoom.StartTime === "") ) {
            console.log("No Attributes for Roombooking found")
        } else {
            bookedRooms.push(bookedRoom);
            console.log(bookedRooms);
        }
        localStorage.setItem("bookedRooms", JSON.stringify(bookedRoom));
    }

    const [selectedClass, setSelectedClass] = React.useState({className: ''})


    return(
            <div id="roomBookingInformation">
                <div id="bodyForBooking">
                    <div id="headBookingInfoPopup">
                        <h4 id="bookingRoomId">{onBookingRoomItem.id}</h4>
                        <h1 id="bookingRoomName">{onBookingRoomItem.name}</h1>
                    </div>
                    <div id="bookingInfoPreSelected">
                        <div id="leftBookingInfoPopup">
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="bookingRoomCapacity"
                                label="Kapazität"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={onBookingRoomItem.capacity}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="bookingRoomAttribut"
                                label="Attribut"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={onBookingRoomItem.attribut}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="bookingRoomHaus"
                                label="Haus"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={onBookingRoomItem.haus}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="bookingRoomEbene"
                                label="Ebene"
                                sx={{width: '80%', marginBottom: '3%'}}
                                defaultValue={onBookingRoomItem.ebene}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div id="rightBookingInfoPopup">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker label="Datum" className="rightBoxesRoomBooking" inputFormat="MM/DD/YYYY" onChange={handleDateChange} value={date} renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomDate"
                                />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker label="Start Time" className="rightBoxesRoomBooking" onChange={handleStartTimeChange} value={startTime} renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomStartTime"/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker label="End Time" className="rightBoxesRoomBooking" onChange={handleEndTimeChange} value={endTime} renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomEndTime"/>}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div id="classSelection">
                        <TextField
                            select
                            className="classBoxes"
                            label="Klasse"
                            id="selectClass"
                            onChange={ (e) => {handleSelectedClass(e)}}
                            sx={{width: '40%'}}
                        >
                            {myClass.map((option) => (
                                <MenuItem key={option.class} value={option.class} >
                                    {option.class}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            className="classBoxes"
                            label="Modul"
                            id="selectModul"
                            sx={{width: '40%'}}
                        >
                            {myClass.map((option, index) => {
                                    return option.class === selectedClass.className ?
                                        (<MenuItem key={index} value={option.module_1}>
                                                {option.module_1}
                                            </MenuItem>
                                        ) : null
                                }
                            )}
                        </TextField>
                    </div>
                    <div id="clickToBookRoom">
                        <Button onClick={bookRoom} variant="contained">Raum buchen</Button>
                    </div>
                </div>
            </div>
    )
}

export default RoomInformation;