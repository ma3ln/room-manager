import React, {useEffect, useState} from 'react';
import logo from '../logo.svg';
import './CSS/App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebars from "./Sidebars";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <div className={"Sidebare"}>
                <Sidebars />
            </div>
            <header className="App-header">
              <Routes>
              <Route path={"/"} element={<Login />}></Route>
              <Route path={"dashboard"} element={<Dashboard />}></Route>
              </Routes>
            </header>

        </BrowserRouter>
    </div>
  );
}

export default App;
