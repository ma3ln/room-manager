import React, {useEffect} from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import "../CSS/Popup/RoomInformation.css";
import Popup from "reactjs-popup";
import myClass from "../resources/myClass.json";
import bookedRooms from "../resources/bookedRooms.json";
import {useParams} from "react-router-dom";



// @ts-ignore
const RoomInformation = ({ onBookingRoomItem}) => {

    //const [bookedRoom, setBookedRoom] = React.useState({ID: '', Name: '', StartTime: '', EndTime: '', Date: '', Capacity: '', Attribut: '', Haus: '', Ebene: '', Class: '', Modul: ''})
    const {roomId} = useParams();
    const [selectedRoom, setSelectedRoom] = React.useState(null);
    const [startTime, setStartTime] = React.useState<Dayjs | null>(

    )

    useEffect(() => {

    })

    const [disabled, setDisabled] = React.useState(true);

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
        console.log(onBookingRoomItem)

        var roomID = ((document.getElementById("bookingRoomId")! as HTMLInputElement).innerHTML)
        var name = ((document.getElementById("bookingRoomName")! as HTMLInputElement).innerHTML)
        var date = ((document.getElementById("bookingRoomDate")! as HTMLInputElement).value)
        var startTime =  ((document.getElementById("bookingRoomStartTime")! as HTMLInputElement).value)
        var endTime = ((document.getElementById("bookingRoomEndTime")! as HTMLInputElement).value)

        const formdata = new FormData();
        formdata.append("roomID", roomID);
        formdata.append("name", name);
        formdata.append("date", date);
        formdata.append("startTime", startTime);
        formdata.append("endTime", endTime);


            fetch("http://localhost:8081/bookRoom", {
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

    function handleDisabledModule() {
        setDisabled(false);
    }



    const [selectedClass, setSelectedClass] = React.useState({className: ''})


    return(
            <div id="roomBookingInformation">
                <div id="bodyForBooking">
                    {onBookingRoomItem.map((selectedRoom: {_id: string, name: string}) => (
                        <div id="headBookingInfoPopup" key={selectedRoom._id}>
                            <h4 id="bookingRoomId">{selectedRoom._id}</h4>
                            <h1 id="bookingRoomName">{selectedRoom.name}</h1>
                        </div>
                    ))}
                        <div id="bookingInfoPreSelected">
                            {onBookingRoomItem.map((selectedRoom: {_id: string, capacity: number, attribut: string, haus: string, ebene: number}) => (
                                <div id="leftBookingInfoPopup" key={selectedRoom._id}>
                                    <TextField
                                        className="leftBoxesRoomBooking"
                                        id="bookingRoomCapacity"
                                        disabled
                                        label="Kapazität"
                                        sx={{width: '80%', marginBottom: '3%'}}
                                        defaultValue={selectedRoom.capacity}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextField
                                        className="leftBoxesRoomBooking"
                                        id="bookingRoomAttribut"
                                        disabled
                                        label="Attribut"
                                        sx={{width: '80%', marginBottom: '3%'}}
                                        defaultValue={selectedRoom.attribut}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextField
                                        className="leftBoxesRoomBooking"
                                        id="bookingRoomHaus"
                                        disabled
                                        label="Haus"
                                        sx={{width: '80%', marginBottom: '3%'}}
                                        defaultValue={selectedRoom.haus}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextField
                                        className="leftBoxesRoomBooking"
                                        id="bookingRoomEbene"
                                        disabled
                                        label="Ebene"
                                        sx={{width: '80%', marginBottom: '3%'}}
                                        defaultValue={selectedRoom.ebene}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                            ))}
                        <div id="rightBookingInfoPopup">
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <DesktopDatePicker
                                    label="Datum"
                                    className="rightBoxesRoomBooking"
                                    inputFormat="MM/DD/YYYY"
                                    onChange={handleDateChange}
                                    value={date}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomDate"
                                />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    minTime={dayjs("08:00", "hh:mm")}
                                    maxTime={dayjs("17:00", "hh:mm")}
                                    label="Start Time"
                                    className="rightBoxesRoomBooking"
                                    onChange={handleStartTimeChange}
                                    value={startTime}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomStartTime"/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    label="End Time"
                                    minTime={dayjs("09:00", "hh:mm")}
                                    maxTime={dayjs("18:00", "hh:mm")}
                                    className="rightBoxesRoomBooking"
                                    onChange={handleEndTimeChange}
                                    value={endTime}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomEndTime"/>}
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
                            onChange={ (e) => {handleSelectedClass(e); handleDisabledModule()}}
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
                            disabled={disabled}
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