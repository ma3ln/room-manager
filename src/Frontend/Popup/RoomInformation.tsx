import React, {useEffect} from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import "../CSS/Popup/RoomInformation.css";

import {useParams} from "react-router-dom";
import BookRoomButton from "../Button/BookRoomButton";



// @ts-ignore
const RoomInformation = ({ onBookingRoomItem}) => {

    const {roomId} = useParams();
    const [startTime, setStartTime] = React.useState<Dayjs | null>(

    )


    useEffect(() => {

    })

    const [disabled, setDisabled] = React.useState(true);

    const [date, setDate] = React.useState<Dayjs | null>(

    )

    function handleAbleEndTimePicker() {
        setDisabled(false);
        console.log(disabled)
    }

    const [endTime, setEndTime] = React.useState<Dayjs | null>(

    )

    function handleStartTimeChange(newValue: Dayjs | null | undefined) {
        setStartTime(newValue);
    }

    function handleEndTimeChange(newValue: Dayjs | null | undefined) {
        setEndTime(newValue);
    }

    function handleDateChange(newValue: Dayjs | null | undefined) {
        setDate(newValue);
    }

    function handleSelectedClass(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSelectedClass({className: e.target.value})
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
                            {onBookingRoomItem.map((selectedRoom: {_id: string, capacity: number, attribut: string, haus: string, ebene: number, location: string}) => (
                                <div id="leftBookingInfoPopup" key={selectedRoom._id}>
                                    <TextField
                                        className="leftBoxesRoomBooking"
                                        id="bookingRoomCapacity"
                                        disabled
                                        label="Kapazität"
                                        sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000000",
                                                color: "#000000"
                                            }}}
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
                                        sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000000",
                                                color: "#000000"
                                            }}}
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
                                        sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000000",
                                                color: "#000000"
                                            }}}
                                        defaultValue={selectedRoom.haus}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextField
                                        className="leftBoxesRoomBooking"
                                        id="bookingRoomLocation"
                                        disabled
                                        label="Location"
                                        sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000000",
                                                color: "#000000"
                                            }}}
                                        defaultValue={selectedRoom.location}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                                    <TextField
                                        className="leftBoxesRoomBooking"
                                        id="bookingRoomEbene"
                                        disabled
                                        label="Ebene"
                                        sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000000",
                                                color: "#000000"
                                            }}}
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
                                    disablePast
                                    onChange={handleDateChange}
                                    value={date}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomDate"
                                />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    label="Start Time"
                                    className="rightBoxesRoomBooking"
                                    onChange={(e) => {handleStartTimeChange(e); handleAbleEndTimePicker()}}
                                    value={startTime}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%'}} id="bookingRoomStartTime"/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    label="End Time"
                                    disabled={disabled}
                                    minTime={dayjs(startTime)}
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
                            className="classBoxes"
                            label="Klasse"
                            id="selectClass"
                            onChange={ (e) => {handleSelectedClass(e); handleDisabledModule()}}
                            sx={{width: '40%'}}
                        >
                        </TextField>
                        <TextField
                            disabled={disabled}
                            className="classBoxes"
                            label="Modul"
                            id="selectModul"
                            sx={{width: '40%'}}
                        >
                        </TextField>
                    </div>
                    <BookRoomButton />
                </div>
            </div>
    )
}

export default RoomInformation;