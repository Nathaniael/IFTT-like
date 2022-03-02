import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'

import './index.css'

import ConnexionPage from "./Components/Connexion/ConnexionPage";
import ListServices from "./Components/Services/ListServices";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import GetStarted from "./Components/GetStarted/GetStarted";

function App() {
  return (
    <CookiesProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/services" element={<ListServices/>}/>
            <Route path="/login" element={<ConnexionPage/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/getStarted" element={<GetStarted/>}/>
          </Routes>
      </Router>
    </CookiesProvider>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, rootElement);
