// Extern modules
import React from 'react'
import { useCookies } from 'react-cookie'

// My modules
import ABAnimatedImageTextLink from './ABAnimatedImageTextLink'

// Styles
import styles from './styles/AppBar.module.css'


// Component
function AppBar() {
    const [cookies] = useCookies(['logged', 'closeGetStarted'])

    // Actualize nav bar when the user log in / out, or when he choose to hide / show the getStarted options
    React.useEffect(() => {
    }, [cookies?.closeGetStarted, cookies?.logged])
    return (
        <div className={styles.appBar}>
            {/* AppBar custom links */}
            <ABAnimatedImageTextLink
                linkTitle='Home'
                linkPath='/'
                imgUrl='/three/emile.png'
            ></ABAnimatedImageTextLink>
            <ABAnimatedImageTextLink
                linkTitle='Services'
                linkPath='/services'
                imgUrl='/three/baptiste.png'
            ></ABAnimatedImageTextLink>
            {/* Show the getStarted link only with the client choose to not hide it */}
            {cookies?.closeGetStarted ?
                null
                :
                <ABAnimatedImageTextLink
                    linkTitle="Get Started"
                    linkPath="/getStarted"
                    imgUrl="/three/nathaniael.png"
                ></ABAnimatedImageTextLink>
            }
            {/* Show the profile link if the user is logged, the login link if not */}
            {cookies?.logged ?
                <ABAnimatedImageTextLink
                    linkTitle="Profile"
                    linkPath="/profile"
                    imgUrl="/three/kilian.png"
                ></ABAnimatedImageTextLink>
                :
                <ABAnimatedImageTextLink
                    linkTitle="Login"
                    linkPath="/login"
                    imgUrl="/three/kilian.png"
                ></ABAnimatedImageTextLink>
            }
        </div>
    )
}

export default AppBar;