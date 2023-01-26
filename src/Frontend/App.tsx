import React from 'react';
import logo from '../logo.svg';
import './CSS/App.css';
import Login from './Login';
import Dashboard from "./Dashboard";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Dashboard/>
      </header>
    </div>
  );
}

export default App;
