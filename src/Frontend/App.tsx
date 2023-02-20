import React from 'react';
import './CSS/App/App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import NewRooms from "./NewRooms";
import AddRoom from "./AddRoom";
import {Topbar} from "./Topbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebars from "./Sidebars";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function App() {

    const AppLayout = () => (
        <div id="App">
            <div id="topbar">
                <Topbar/>
            </div>
            <div id="middlePage">
                <div id="sidebar">
                    <Sidebars/>
                </div>
                <div id="main">
                    <Outlet/>
                </div>
            </div>
            <div id="footer">
                <Footer/>
            </div>
        </div>
    );

    return (
        <BrowserRouter>
                <div id="content">
                    <Routes>
                        <Route path={"/"} element={<Login/>} />
                        <Route element={<AppLayout/>} >
                            <Route path={"/dashboard"} element={<Dashboard />}></Route>
                            <Route path={"/newrooms"} element={<NewRooms />}></Route>
                            <Route path={"/addroom"} element={<AddRoom />}></Route>
                        </Route>
                    </Routes>
                </div>
        </BrowserRouter>
  );
}

export default App;
