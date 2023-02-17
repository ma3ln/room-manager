import React from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import "../CSS/RoomInformation.css";



// @ts-ignore
const RoomInformation = ({ onBookingRoomItem}) => {

    function handleChange(newValue: Dayjs | null) {
        setValue(newValue);
    }

    function handleSelectedClass(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSelectedClass({className: e.target.value})
    }

    function testDataPassing() {

    }

    const [value, setValue] = React.useState<Dayjs | null>()
    const [selectedClass, setSelectedClass] = React.useState({className: ''})

    const myClass = [
            {
                class: "B21",
                Moduls: [
                    "Grundlagen in Programmierung",
                    "Datenbanken 1",
                    "Datenanalyse" ]
            },
        {
                class: "A21",
                Moduls: [ "Chemie", "Rechenanlagen", "Statistik"]
        }
    ]

    return(
        <div id="roomBookingInformation">
            <div id="headingForBooking">
                <h1>new Booking</h1>
            </div>
            <div id="bodyForBooking">
                <div id="headBookingInfoPopup">
                    <h4>{onBookingRoomItem.id}</h4>
                    <h1>Room: {onBookingRoomItem.name}</h1>
                </div>
                <div id="bookingInfoPreSelected">
                    <div id="leftBookingInfoPopup">
                        <TextField
                            className="leftBoxesRoomBooking"
                            id="disabledCapacity"
                            label="Kapazität"
                            sx={{width: '80%'}}
                            defaultValue={onBookingRoomItem.capacity}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className="leftBoxesRoomBooking"
                            id="disabledAttribute"
                            label="Attribut"
                            sx={{width: '80%'}}
                            defaultValue={onBookingRoomItem.attribut}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className="leftBoxesRoomBooking"
                            id="disabledHouse"
                            label="Haus"
                            sx={{width: '80%'}}
                            defaultValue={onBookingRoomItem.haus}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className="leftBoxesRoomBooking"
                            id="disabledFloor"
                            label="Ebene"
                            sx={{width: '80%'}}
                            defaultValue={onBookingRoomItem.ebene}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div id="rightBookingInfoPopup">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker label="Datum" className="rightBoxesRoomBooking" inputFormat="MM/DD/YYYY" onChange={handleChange} value={value} renderInput={(params) => <TextField {...params} sx={{width: '80%'}}                             InputProps={{
                                readOnly: true,
                            }} />} />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="Start Time" className="rightBoxesRoomBooking" onChange={handleChange} value={value} renderInput={(params) => <TextField {...params} sx={{width: '80%'}}/>}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="End Time" className="rightBoxesRoomBooking" onChange={handleChange} value={value} renderInput={(params) => <TextField {...params} sx={{width: '80%'}}/>}
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
                        sx={{width: '50%'}}
                    >
                        {myClass.map((option) => (
                            <MenuItem key={option.class} value={option.class} >
                                {option.class}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        disabled
                        className="classBoxes"
                        label="Modul"
                        id="selectModul"
                        sx={{width: '50%'}}
                    >
                        {myClass.map((option) => {
                            return option.class === selectedClass.className ?
                                (<MenuItem key={option.class} value={option.Moduls}>
                                    {option.Moduls.map((Modul) => (
                                        <div>
                                            {Modul}
                                        </div>
                                    ))}
                                </MenuItem>) : null
                            }
                        )}
                    </TextField>
                </div>
                <div id="clickToBookRoom">
                    <Button onClick={testDataPassing} variant="contained">Raum buchen</Button>
                </div>
            </div>
        </div>
    )
}

export default RoomInformation;