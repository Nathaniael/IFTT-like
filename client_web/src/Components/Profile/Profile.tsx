// Extern modules
import React from 'react'
import { useCookies } from 'react-cookie'

// My modules
import AppBar from '../AppBar/AppBar'
import Request from '../Request'
import { goToPage } from '../Utils';

// Styles
import styles from './styles/Profile.module.css'

function Profile() {
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "username", "closeGetStarted"])

    function resetCookie() {
        removeCookie("logged")
        removeCookie("access_token")
        removeCookie("username")
        removeCookie("closeGetStarted")
        goToPage("/login")
    }

    React.useState(() => {
        // Redirect to login page if the user isn't logged
        if (cookies?.logged === undefined) {
            goToPage("/login")
        }

        // Get the user profile
        Request.getProfile().then((res) => {
            // Set username if success
            setCookies("username", res)
        }).catch((err) => {
            // Logout if error (to discourage the viscious ones)
            resetCookie()
        })    
    })

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