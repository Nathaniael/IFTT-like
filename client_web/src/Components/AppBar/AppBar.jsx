import React from 'react'
import styles from './AppBar.module.css'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function CustomLink({title, path, imgUrl}) {
    const [animate, setAnimate] = React.useState(false)

    return (
        <Link onMouseEnter={() => {setAnimate(true)}} onMouseLeave={() => {setAnimate(false)}} to={path}>
            <div className={`${styles.linkText} ${animate ? styles.animateText : null}`}>{title}</div>
            <img className={`${styles.linkImg} ${animate ? styles.animateImg : null}`} src={imgUrl} alt={imgUrl}></img>
        </Link>
    )
}

function AppBar() {
    const [cookies] = useCookies('logged', 'closeGetStarted')

    React.useEffect(() => {
    }, [cookies?.closeGetStarted])
    return (
        <div className={styles.appBar}>
            <CustomLink title="Home" path="/" imgUrl="/three/emile.png"></CustomLink>
            <CustomLink title="Services" path="/services" imgUrl="/three/baptiste.png"></CustomLink>
            {cookies?.closeGetStarted ?
                null
                :   <CustomLink title="Get Started" path="/getStarted" imgUrl="/three/nathaniael.png"></CustomLink>
            }
            {cookies?.logged ?
                    <CustomLink title="Profile" path="/profile" imgUrl="/three/kilian.png"></CustomLink>
                :   <CustomLink title="Login" path="/login" imgUrl="/three/kilian.png"></CustomLink>
            }
            </div>
    )
}

export default AppBar