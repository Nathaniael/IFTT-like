// Extern modules
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

// My modules
import AppBar from '../AppBar/AppBar'
import Request from '../Request'
import { goToPage } from '../Utils';
import PBar from './PBar';
import PProfile from './PProfile';
import PServices from './PServices';
import POauth from './POauth';

// Styles
import styles from './styles/Profile.module.css'

// Types
import { WhichPage } from '../../Types/Types';

function ProfilePage() {
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "username", "closeGetStarted", "gitlab_token"])
    const [page, setPage] = useState(WhichPage.Profile)

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
                {page === WhichPage.Profile ? 
                    <PProfile username={cookies?.username}></PProfile>
                    :
                    null
                }
                {page === WhichPage.Oauth ? 
                    <POauth></POauth>
                    :
                    null
                }
                {page === WhichPage.Services ?
                    <PServices></PServices>
                    :
                    null
                }
                <PBar setPage={setPage} deconnexion={resetCookie}></PBar>
                {/* 
                <button onClick={() => {resetCookie()}}>LOGOUT</button> */}
            </div>
        </div>
    )
}

export default ProfilePage