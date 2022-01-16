import React from 'react'
import styles from './Home.module.css'
import AppBar from './AppBar'

function initGrid(squareSize) {
    const nbPerline = window.outerWidth / squareSize
    const nbPerColumn = window.outerHeight / squareSize
    
    var newGrid = []
    for (var i = 0; i < nbPerColumn; i++) {
        var line = []
        for (var j = 0; j < nbPerline; j++) {
            line = line.concat({top: i * squareSize + "px", left: j * squareSize + "px", width: squareSize + "px", height: squareSize + "px"})
        }
        newGrid = newGrid.concat(line)
    }
    return newGrid
}

function Home() {
    const [pos, setPos] = React.useState({left: -100 + "px", top: -100 + "px"})
    const [grid, setGrid] = React.useState(initGrid(100))

    function moveTheMouse(e) {
        setPos({ left: e.clientX + "px", top: e.clientY + "px"})
    }

    return (
        <div className={styles.home} onMouseMove={(e) => {moveTheMouse(e)}}>
            <AppBar></AppBar>
            <button className={styles.buttonArea}>Get Area Started</button>
            <div className={styles.followMouse} style={pos}></div>
            <div className={styles.grid}>
                {grid?.map((elem, index) => {
                    return (
                        <div className={styles.gridItem} key={index} style={elem}></div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
