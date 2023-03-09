import React, {Suspense} from 'react';
import './CSS/App/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./CSS/Background/LoaderForRendering.css"
import FrontPage from "./FrontPage";

const Dashboard = React.lazy(() => import("./Dashboard"))
const NewRooms = React.lazy(() => import("./NewRooms"))
const AddRoom = React.lazy(() => import("./AddRoom"))
const Sidebars = React.lazy(() => import("./Sidebars"))
const Footer = React.lazy(() => import("./Footer"))
const Topbar = React.lazy(() => import("./Topbar"))
const Login = React.lazy(() => import("./Login"))
const FilterForStudent = React.lazy(() => import("./FilterForStudent"))

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
                        <Route path={"/"} element={<FrontPage />}/>
                            <Route path={"/login"} element={
                                <Suspense fallback={<div className="loader"></div>}>
                                    <Login/>
                                </Suspense>
                                } />
                            <Route path={"/student"} element={
                                <Suspense fallback={<div className="loader"></div>}>
                                    <FilterForStudent />
                                </Suspense>}></Route>
                                <Route element={<AppLayout/>} >
                                    <Route path={"/dashboard"} element={
                                        <Suspense fallback={<div className="loader"></div>}>
                                            <Dashboard />
                                        </Suspense>
                                        }></Route>
                                    <Route path={"/newrooms"} element={
                                        <Suspense fallback={<div className="loader"></div>}>
                                            <NewRooms />
                                        </Suspense>
                                        }></Route>
                                    <Route path={"/addroom"} element={
                                        <Suspense fallback={<div className="loader"></div>}>
                                            <AddRoom />
                                        </Suspense>}></Route>
                            </Route>
                    </Routes>
                </div>
        </BrowserRouter>
  );
}

export default App;
