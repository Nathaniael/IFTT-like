import React from 'react'
import styles from './AppBar.module.css'

function AppBar() {
    return (
        <div className={styles.appBar}>
            <div className={styles.navHover}><a>- Login -</a></div>
            <div className={styles.navHover}><a className={styles.title}>✨ AREA ✨</a></div>
            <div className={styles.navHover}><a>- Get Started -</a></div>
        </div>
    )
}

export default AppBar
