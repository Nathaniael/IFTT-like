import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import AppBar from '../AppBar/AppBar'
import { goToPage } from '../Utils'

import styles from './GetStarted.module.css'

function GetStarted() {
    const [cookies, setCookies, removeCookies] = useCookies('closeGetStarted')

    function closeIt() {
        setCookies('closeGetStarted', true);
        goToPage("/services")
    }

    function enableIt() {
        removeCookies('closeGetStarted')
        goToPage("/getStarted")
    }

    return (
        <div className={styles.background}>
            <AppBar></AppBar>
            <div className={styles.getStartedPage}>
                {cookies?.closeGetStarted ?
                        <button onClick={() => {enableIt()}}>Enable it again ! ✅</button>
                    :   <button onClick={() => {closeIt()}}>Don't show this again ❌</button>
                }
                <div className={styles.title}>STEP ONE : Create an account / login to your account</div>
                <Link to="/login">
                    <button className={styles.button}>GO LOGIN</button>
                </Link>
                <div className={styles.title}>STEP TWO : Got to your profile and grant access to the oauth services used by our app</div>
                <Link to="/profile">
                    <button className={styles.button}>GO PROFILE</button>
                </Link>
                <div className={styles.title}>STEP THREE : Go to services and select a service you want to use</div>
                <div className={styles.title}>STEP FOUR : Select an action from the service</div>
                <div className={styles.title}>STEP FIVE : Select a reaction from the service or from another service</div>
                <Link to="/services">
                    <button className={styles.button}>GO SERVICES</button>
                </Link>
            </div>
        </div>
    )
}

export default GetStarted