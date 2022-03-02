// Extern modules
import React from 'react'
import { useCookies } from 'react-cookie'

// My modules
import AppBar from '../AppBar/AppBar'
import Request from '../Request'
import { goToPage } from '../Utils';

// Styles
import styles from './Profile.module.css'

function Profile() {
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "username"])

    if (cookies?.logged === undefined) {
        console.log("BLBLBLBLBL")
        goToPage("/login")
    }

    function resetCookie() {
        removeCookie("logged")
        removeCookie("access_token")
        removeCookie("username")
        removeCookie("closeGetStarted")
        goToPage("/login")
    }

    React.useState(() => {
        Request.getProfile().then((res) => {
            setCookies("username", res)
        }).catch((err) => {
            resetCookie()
        })    
    }, [])

    return (
        <div className={styles.background}>
            <AppBar></AppBar>
            <div className={styles.profilePage}>
                <div>Profile of {cookies?.username}</div>
                <button onClick={() => {resetCookie()}}>LOGOUT</button>
            </div>
        </div>
    )
}

export default Profile