// Extern modules
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

// My modules
import AppBar from '../AppBar/AppBar'
import Request from '../Request'
import { goToPage } from '../Utils';
import PBar from './PBar';
import PProfile from './PProfile';
import PArea from './PArea';
import POauth from './POauth';

// Styles
import styles from './styles/Profile.module.css'

// Types
import { WhichPage } from '../../Types/Types';


// Component
function ProfilePage() {
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "user", "closeGetStarted", "gitlab_token"])
    const [page, setPage] = useState(WhichPage.Profile)

    function resetCookie() {
        // Application cookies
        removeCookie("logged")
        removeCookie("access_token")
        removeCookie("user")
        removeCookie("closeGetStarted")

        // OAuth cookies
        removeCookie("gitlab_token")

        goToPage("/login")
    }

    function getUserProfile() {
        // Get the user profile
        Request.getProfile().then((res) => {
            // Set username if success
            setCookies("user", res)
        }).catch((err) => {
            // Logout if error (to discourage the viscious ones)
            resetCookie()
        })    
    }
    React.useEffect(() => {
        // Redirect to login page if the user isn't logged
        if (cookies?.logged === undefined) {
            goToPage("/login")
        }
        getUserProfile()
    }, [page])

    return (
        <div className={styles.background}>
            <AppBar></AppBar>
            <div className={styles.profilePage}>
                {page === WhichPage.Profile ?
                    <PProfile username={cookies?.user?.username} image={cookies?.user?.image} email={cookies?.user?.email} update={() => {getUserProfile()}}></PProfile>
                    :
                    null
                }
                {page === WhichPage.Oauth ? 
                    <POauth></POauth>
                    :
                    null
                }
                {page === WhichPage.Services ?
                    <PArea></PArea>
                    :
                    null
                }
                <PBar username={cookies?.user?.username} image={cookies?.user?.image} email={cookies?.user?.email} setPage={setPage} deconnexion={resetCookie}></PBar>
            </div>
        </div>
    )
}

export default ProfilePage