import React from 'react';
import './CSS/App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import NewRooms from "./NewRooms";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebars from "./Sidebars";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
              <Routes>
              <Route path={"/"} element={<Login />}></Route>
              <Route path={"dashboard"} element={<Dashboard />}></Route>
              <Route path={"newroom"} element={<NewRooms />}></Route>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
