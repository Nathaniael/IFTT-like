import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import HomeTree from "./Components/HomeThree.js/HomeTree";
import './index.css'
import Login from "./Components/Login/Login"

function App() {
  const [home, setHome] = React.useState(false)
  return (
    <div>
      {home ?
        <Login></Login>
        :
        <div onClick={() => {setHome(!home)}}>
          <div className="firstTitle">
            <h1>THIS IS AREA</h1>
          </div>
          <HomeTree></HomeTree>
        </div>
      }
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, rootElement);
