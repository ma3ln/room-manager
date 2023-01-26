import React from 'react';
import logo from '../logo.svg';
import './CSS/App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
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
