import React, {Suspense} from 'react';
import './CSS/App/App.css';
import Login from './Login';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Outlet } from "react-router-dom";

const Dashboard = React.lazy(() => import("./Dashboard"))
const NewRooms = React.lazy(() => import("./NewRooms"))
const AddRoom = React.lazy(() => import("./AddRoom"))
const Sidebars = React.lazy(() => import("./Sidebars"))
const Footer = React.lazy(() => import("./Footer"))
const Topbar = React.lazy(() => import("./Topbar"))

function App() {

    const AppLayout = () => (
        <div id="App">
            <div id="topbar">
                <Suspense fallback={<div>Loading...</div>}>
                    <Topbar/>
                </Suspense>
            </div>
            <div id="middlePage">
                <div id="sidebar">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Sidebars/>
                    </Suspense>

                </div>
                <div id="main">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
            <div id="footer">
                <Suspense fallback={<div>Loading...</div>}>
                    <Footer/>
                </Suspense>

            </div>
        </div>
    );

    return (
        <BrowserRouter>
                <div id="content">
                    <Routes>
                        <Route path={"/"} element={<Login/>} />
                            <Route element={<AppLayout/>} >
                                <Route path={"/dashboard"} element={
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Dashboard />
                                    </Suspense>
                                    }></Route>
                                <Route path={"/newrooms"} element={
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <NewRooms />
                                    </Suspense>
                                    }></Route>
                                <Route path={"/addroom"} element={
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <AddRoom />
                                    </Suspense>}></Route>
                            </Route>
                    </Routes>
                </div>
        </BrowserRouter>
  );
}

export default App;
