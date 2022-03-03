// Extern modules
import React from 'react'
import { useCookies } from 'react-cookie'

// My modules
import AppBar from '../AppBar/AppBar'
import Request from '../Request'
import { goToPage } from '../Utils';

// My modules
import PServices from './PServices';

// Styles
import styles from './styles/Profile.module.css'

function Profile() {
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "username", "closeGetStarted", "gitlab_token"])

    function resetCookie() {
        // Application cookies
        removeCookie("logged")
        removeCookie("access_token")
        removeCookie("username")
        removeCookie("closeGetStarted")

        // OAuth cookies
        removeCookie("gitlab_token")

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
            <PServices></PServices>
        </div>
    )
}

export default Profile