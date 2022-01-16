import React from 'react'
import styles from './Home.module.css'
import AppBar from './AppBar'

function Home() {
    const [pos, setPos] = React.useState({left: -100 + "px", top: -100 + "px"})

    function moveTheMouse(e) {
        setPos({ left: e.clientX + "px", top: e.clientY + "px"})
    }

    return (
        <div className={styles.home} onMouseMove={(e) => {moveTheMouse(e)}}>
            <img className={styles.backgroundHomeImg} src="backgroundHomeImg.jpg"></img>
            <AppBar></AppBar>
            <button className={styles.buttonArea}>Get Area Started</button>
            <div className={styles.followMouse} style={pos}></div>
            <div>{pos.x}{pos.y}</div>
        </div>
    )
}

export default Home
