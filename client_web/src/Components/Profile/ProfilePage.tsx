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
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "user", "closeGetStarted", "gitlab_token", "profilePage"])
    const [page, setPage] = useState(WhichPage.Profile)

    function resetCookie() {
        // Application cookies
        removeCookie("logged")
        removeCookie("access_token")
        removeCookie("user")
        removeCookie("closeGetStarted")
        removeCookie("profilePage")
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

    function setPersistentPage(newPage: WhichPage) {
        setPage(newPage)
        setCookies("profilePage", newPage)
    }

    React.useEffect(() => {
        // Redirect to login page if the user isn't logged
        if (cookies?.logged === undefined) {
            goToPage("/login")
        }
        if (cookies.profilePage === undefined) {
            setCookies("profilePage", page)
        } else {
            setPage(cookies.profilePage)
        }
        getUserProfile()
    }, [])

    return (
        <div className="background">
            <AppBar></AppBar>
            <div className={styles.profilePage}>
                {page === WhichPage.Profile ?
                    <PProfile username={cookies?.user?.username} image={cookies?.user?.image} email={cookies?.user?.email} update={() => {getUserProfile()}} logout={resetCookie}></PProfile>
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
                <PBar username={cookies?.user?.username} image={cookies?.user?.image} email={cookies?.user?.email} setPage={setPersistentPage} deconnexion={resetCookie}></PBar>
            </div>
        </div>
    )
}

export default ProfilePage