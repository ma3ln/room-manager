import "./CSS/Dashboard.css"
import React from "react";

function Dashboard(){
    return(
        <div className="Dashboard">
            <div className="header"></div>
            <div className="sidebar"></div>
            <div className="content"></div>
            <div className=""></div>
            <menu className={"Menubar"}>
                <ul><button>test</button></ul>
            </menu>
        </div>
    );
}

export default Dashboard;