import React from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import "../CSS/Popup/RoomInformation.css";
import {DeleteButton} from "../Button/DeleteButton";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {AssignmentTurnedIn} from "@mui/icons-material";



// @ts-ignore
const RoomInformation = ({ onBookedRoomItem, onSelectedReservation}) => {


    dayjs.extend(utc)
    dayjs.extend(timezone)
    const [bookedRoom, setBookedRoom] = React.useState({ID: '', Name: '', StartTime: '', EndTime: '', Date: '', Capacity: '', Attribut: '', Haus: '', Ebene: '', Class: '', Modul: ''})


    const fontColor = {
        style: { color: '#000000'}
    }

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
                    {onBookedRoomItem.map((selecBRoom: {_id: string, capacity: number, attribut: string, haus: string, ebene: number, location: string}) => (
                        <div id="leftBookingInfoPopup" key={selecBRoom._id}>
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="dashboardBookingRoomCapacity"
                                disabled
                                label="Kapazität"
                                sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                        color: "#000000"
                                    }}}
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
                                sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                        color: "#000000"
                                    }}}
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
                                sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                        color: "#000000"
                                    }}}
                                defaultValue={selecBRoom.haus}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="dashboardBookingRoomLocation"
                                disabled
                                label="Location"
                                sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                        color: "#000000"
                                    }}}
                                defaultValue={selecBRoom.location}
                                InputProps={{
                                    readOnly: true,
                                }}
                                />
                            <TextField
                                className="leftBoxesRoomBooking"
                                id="dashboardBookingRoomEbene"
                                disabled
                                label="Ebene"
                                sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                        color: "#000000"
                                    }}}
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
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                            WebkitTextFillColor: "#000000",
                                            color: "#000000"
                                        }}} id="bookingRoomDate"
                                />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    label="Start Time"
                                    className="rightBoxesRoomBooking"
                                    onChange={handleStartTimeChange}
                                    disabled
                                    value={dayjs(onSelectedReservation.startTime).utc()}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                            WebkitTextFillColor: "#000000",
                                            color: "#000000"
                                        }}} id="bookingRoomStartTime"/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <TimePicker
                                    label="End Time"
                                    className="rightBoxesRoomBooking"
                                    disabled
                                    onChange={handleEndTimeChange}
                                    value={dayjs(onSelectedReservation.endTime).utc()}
                                    renderInput={(params) => <TextField {...params} sx={{width: '80%', marginBottom: '3%', "& .MuiInputBase-input.Mui-disabled": {
                                            WebkitTextFillColor: "#000000",
                                            color: "#000000"
                                        }}} id="bookingRoomEndTime"/>}
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
                            sx={{width: '40%', "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                    color: "#000000"
                                }}}
                        >
                        </TextField>
                        <TextField
                            disabled
                            className="classBoxes"
                            defaultValue={onSelectedReservation.module}
                            label="Modul"
                            id="dashboardSelectModul"
                            sx={{width: '40%', "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                    color: "#000000"
                                }}}
                        >
                        </TextField>
                    </div>

                <DeleteButton />
            </div>
        </div>
    )
}

export default RoomInformation;