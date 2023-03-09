import React from "react";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import "./CSS/App/FilterForStudent.css";


function FilterForStudent() {

    const [filteredListForStudent, setFilteredListForStudent] = React.useState([])

    function filterStudentRooms() {
        var course = (document.getElementById("course")! as HTMLInputElement).value
        var module = (document.getElementById("module")! as HTMLInputElement).value

        console.log(course)
        console.log(module)



        const formdata = new FormData();
        formdata.append("class", course)
        formdata.append("module", module)

        console.log(formdata)

        fetch("http://localhost:8081/student",{
            method: 'POST',
            body: formdata,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(filteredListForStudent => {
                if (filteredListForStudent != null) {
                    console.log(filteredListForStudent)
                    setFilteredListForStudent(filteredListForStudent)
                }else{
                    setFilteredListForStudent([])
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div id="contentFilterForStudent">
            <div id="contentBoxesFilterForStudent">
                <div id="newFilterForStudent">
                    <div id="textFilterForStudent">
                        <h1>Filter nach deinem Kurs / Modul</h1>
                    </div>
                    <div id="newFilterForStudentInput">
                        <div id="filter">
                            <div id="leftFilter">
                                <div className="filterForStudent">
                                    <TextField
                                        id="course"
                                        label="Kurs"
                                        sx={{width: '100%'}}
                                    ></TextField>
                                </div>
                                <div className="filterForStudent">
                                    <TextField
                                        id="module"
                                        label="Modul"
                                        sx={{width: '100%'}}
                                    >
                                    </TextField>
                                </div>
                            </div>
                        </div>
                        <div id="boxFilterButton">
                            <Button onClick={filterStudentRooms} id="buttonRoomFilter" variant="contained" sx={{width: '50%', backgroundColor: '#365D73'}}>Nach Raum filtern</Button>
                        </div>
                    </div>
                </div>
                <div id="roomForStudentFilterDiv">
                    <div id="boxTitleForStudentFilter">
                        <h2 id="titleForStudentFilter">Termine</h2>
                    </div>
                    <div className="list-group-student-filter">
                        <ul id="listForStudentFilter">
                            {filteredListForStudent.map((room: {_id: string, name: string, class: string, module: string, date: string, week: string, startTime: string, endTime: string}) => (
                                <div key={room._id} className="theWeek">
                                    <h2>Woche: {room.week}</h2>
                                    <div className="infoRoomForCourseReservation">
                                        <div className="infoNameDate">
                                            <h3 className="studentFilterTitleRoom">Raum: {room.name}</h3>
                                        </div>
                                        <div className="infoClassModule">
                                            <h3>Kurs: {room.class}</h3>
                                            <h3>Modul: {room.module}</h3>
                                        </div>
                                        <div className="infoDateStartTimeEndTime">
                                            <h3>Datum: {room.date}</h3>
                                            <div className="infoStartEnd">
                                                <h3>Start: {room.startTime}</h3>
                                                <h3>Ende: {room.endTime}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterForStudent