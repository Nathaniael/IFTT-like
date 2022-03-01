import React from 'react'
import Request from '../Request'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import styles from './Profile.module.css'
import AppBar from '../AppBar/AppBar'

function Profile() {
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "user"])

    if (cookies.logged == undefined) {
        window.location.href = window.location.href.split("/")[0] + "/login"
    }

    React.useState(() => {
        Request.getProfile().then((res) => {
            setCookies("user", res)
        }).catch((err) => {
            console.log(err)
        })    
    }, [])
    
    function resetCookie() {
        removeCookie("logged")
        removeCookie("access_token")
        removeCookie("user")
        removeCookie("closeGetStarted")
        window.location.href = window.location.href.split("/")[0] + "/login"
    }
    return (
        <div className={styles.background}>
            <AppBar></AppBar>
            <div className={styles.profilePage}>
                <div>Profile of {cookies?.user?.username}</div>
                <button onClick={() => {resetCookie()}}>LOGOUT</button>
            </div>
        </div>
    )
}

export default Profile