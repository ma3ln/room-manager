import React from 'react';
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
              <Routes>
              <Route path={"/"} element={<Login />}></Route>
              <Route path={"dashboard"} element={<Dashboard />}></Route>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
