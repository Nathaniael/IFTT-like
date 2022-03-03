import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'

import './index.css'

import ConnexionPage from "./Components/Connexion/ConnexionPage";
import ListServices from "./Components/Services/ListServices";
import Home from "./Components/Home/Home";
import ProfilePage from "./Components/Profile/ProfilePage";
import GetStarted from "./Components/GetStarted/GetStarted";
import GitLabAuthRedirect from "./Components/OAuth/GitLabAuthRedirect";

function App() {
  return (
    <CookiesProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/services" element={<ListServices/>}/>
            <Route path="/login" element={<ConnexionPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/getStarted" element={<GetStarted/>}/>

            {/* OAuth paths */}
            <Route path="/auth/gitlab" element={<GitLabAuthRedirect/>}/>
          </Routes>
      </Router>
    </CookiesProvider>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, rootElement);
