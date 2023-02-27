import TextField from "@mui/material/TextField";
import attributes from "../resources/attributes.json";
import {MenuItem} from "@mui/material";
import location from "../resources/location.json";
import haus from "../resources/haus.json";
import ebene from "../resources/ebene.json";
import React, {useState} from "react";
import {DesktopDatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";


export function RoomFilterInput() {

    const [house, setSelectedHaus] = useState('');
    const [loc, setSelectedLoc] = useState('');
    const [attribut, setSelectedAttribut] = useState('');
    const [floor, setSelectedFloor] = useState('');
    const [disabled, setDisabled] = React.useState(true);

    function handleHausChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedHaus(event.target.value);
        }
    }

    function handleLocationChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedLoc(event.target.value);
        }
    }

    function handleAttributesChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedAttribut(event.target.value);
        }
    }

    function handleFloorChange(event: React.ChangeEvent<{ value: unknown }>) {
        if (typeof event.target.value === 'string') {
            setSelectedFloor(event.target.value);
        }
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

    function handleAbleEndTimePicker() {
        setDisabled(false);
        console.log(disabled)
    }



    return (
        <div id="filter">
            <div id="leftFilter">
                <div className="leftBoxFilter">
                    <TextField
                        id="numberPeopleInRoom"
                        label="Kapazität"
                        sx={{width: '100%'}}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: "[0, 9]*"
                        }}
                    ></TextField>
                </div>
                <div className="leftBoxFilter">
                    <TextField
                        id="roomAttributes"
                        label="Attribute"
                        sx={{width: '100%'}}
                        select
                        onChange={handleAttributesChange}
                    >

                        {attributes.map((option) => (
                            <MenuItem key={option.attribute} value={option.attribute}>
                                {option.attribute}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="leftBoxFilter">
                    <TextField
                        id="location"
                        label="Location"
                        sx={{width: '100%'}}
                        select
                        onChange={handleLocationChange}
                    >
                        {location.map((option) => (
                            <MenuItem key={option.location} value={option.location}>
                                {option.location}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="leftBoxFilter">
                    <TextField
                        id="bulding"
                        label="Haus"
                        sx={{width: '100%'}}
                        select
                        onChange={handleHausChange}
                    >
                        {haus.map((option) => (
                            <MenuItem key={option.haus} value={option.haus}>
                                {option.haus}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="leftBoxFilter">
                    <TextField
                        id="floor"
                        label="Ebene"
                        sx={{width: '100%'}}
                        select
                        onChange={handleFloorChange}
                    >
                        {ebene.map((option) => (
                            <MenuItem key={option.ebene} defaultValue={"floor"} value={option.ebene}>
                                {option.ebene}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            <div id="rightFilter">
                <div id="boxDatum">
                    <div className="rightBoxFilter">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DesktopDatePicker  disablePast className="date" label="Datum" inputFormat="MM/DD/YYYY" onChange={handleDateChange} value={date} renderInput={(params) => <TextField id="date" {...params} sx={{width: '100%'}} />} />
                        </LocalizationProvider>
                    </div>
                    <div className="rightBoxFilter">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <TimePicker
                                minTime={dayjs("08:00", "hh:mm")}
                                maxTime={dayjs("17:00", "hh:mm")}
                                label="Start Time"
                                className="startTime"
                                onChange={(e) => {handleStartTimeChange(e); handleAbleEndTimePicker()}}
                                value={startTime}
                                renderInput={(params) => <TextField id="startTime" {...params} sx={{width: '100%'}}/>}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="rightBoxFilter">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <TimePicker
                                minTime={dayjs(startTime, "hh:mm")}
                                disabled={disabled}
                                maxTime={dayjs("18:00", "hh:mm")}
                                label="End Time"
                                className="endTime"
                                onChange={handleEndTimeChange}
                                value={endTime}
                                renderInput={(params) => <TextField id="endTime" {...params} sx={{width: '100%'}}/>}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomFilterInput