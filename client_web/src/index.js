import React from "react";
import ReactDOM from "react-dom";
import Service from "./Components/Services/Service";
import './index.css'
import Login from "./Components/Login/Login"
import ChooseService from "./Components/Services/ChooseService";
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from "./Components/Home/Home";
import { CookiesProvider } from 'react-cookie'

function App() {
  return (
    <CookiesProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/services" element={<ChooseService/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/services/:serviceId" element={<Service/>}/>
          </Routes>
      </Router>
    </CookiesProvider>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, rootElement);
