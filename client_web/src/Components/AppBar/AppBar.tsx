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

    React.useEffect(() => {
    }, [cookies?.closeGetStarted])
    return (
        <div className={styles.appBar}>
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
            {cookies?.closeGetStarted ?
                null
                :
                <ABAnimatedImageTextLink
                    linkTitle="Get Started"
                    linkPath="/getStarted"
                    imgUrl="/three/nathaniael.png"
                ></ABAnimatedImageTextLink>
            }
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