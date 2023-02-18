import React from 'react';
import './CSS/App/App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import NewRooms from "./NewRooms";
import AddRoom from "./AddRoom";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebars from "./Sidebars";

function App() {

    return (
    <div className="App">
        <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Login/>} />
                  <Route path={"/dashboard"} element={<Dashboard />}></Route>
                  <Route path={"/newrooms"} element={<NewRooms />}></Route>
                  <Route path={"/addroom"} element={<AddRoom />}></Route>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
