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
    const [animate, setAnimate] = React.useState(false)

    return (
        <Link
            to={props.linkPath}
            onMouseEnter={() => {setAnimate(true)}}
            onMouseLeave={() => {setAnimate(false)}}>
            <div
                className={`${styles.text} ${animate ? styles.animateText : null}`}>
                    {props.linkTitle}
            </div>
            <img 
                className={`${styles.img} ${animate ? styles.animateImg : null}`}
                src={props.imgUrl}
                alt={props.imgUrl}
            ></img>
        </Link>
    )
}

export default ABAnimatedImageTextLink;