import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import HomeTree from "./Components/HomeThree/HomeTree";
import Service from "./Components/Services/Service";
import './index.css'
import Login from "./Components/Login/Login"
import ChooseService from "./Components/Services/ChooseService";
import { Routes, Route, Link, BrowserRouter as Router} from 'react-router-dom';

function Home() {
  return (
    <div>
        <Link to="/Services">
          <div className="firstTitle">
            <h1>THIS IS AREA</h1>
          </div>
          <HomeTree></HomeTree>
        </Link>
    </div>
  )
}

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/services" element={<ChooseService/>}/>
          <Route path="/services/:serviceId" element={<Service/>}/>
        </Routes>
    </Router>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, rootElement);
