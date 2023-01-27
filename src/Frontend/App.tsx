import React from 'react';
import './CSS/App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      <header className="App-header">
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Login />}></Route>
                  <Route path={"dashboard"} element={<Dashboard />}></Route>
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
