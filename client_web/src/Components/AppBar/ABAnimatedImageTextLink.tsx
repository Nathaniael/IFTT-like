// Extern modules
import React from 'react'
import { Link } from 'react-router-dom'

// Styles
import styles from './styles/ABAnimatedImageTextLink.module.css'


// Types
type Props = {
    linkTitle: string,
    linkPath: string,
    imgUrl: string
};


// Component
function ABAnimatedImageTextLink(props: Props) {
    // Default: Text of the link is visible
    const [animate, setAnimate] = React.useState(false)

    return (
        <Link
            to={props.linkPath}
            // Double animation on hover, when one elem fade out the other fade in
            onMouseEnter={() => {setAnimate(true)}}
            onMouseLeave={() => {setAnimate(false)}}>
            <div className={styles.container}>
                <div
                    className={`${styles.text} ${animate ? styles.animateText : null}`}>
                        {props.linkTitle}
                </div>
                <img 
                    className={`${styles.img} ${animate ? styles.animateImg : null}`}
                    src={props.imgUrl}
                    alt={props.imgUrl}
                ></img>
            </div>
        </Link>
    )
}

export default ABAnimatedImageTextLink;