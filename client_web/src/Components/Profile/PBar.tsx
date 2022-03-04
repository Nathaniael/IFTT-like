import React from 'react'
import styles from './styles/PBar.module.css'
import { WhichPage } from '../../Types/Types'


// Types
type ProfileProps = {
    username: string,
    image: string,
    email: string
}

type Props = {
    setPage: Function,
    deconnexion: Function,
    username: string,
    image: string,
    email: string
};

function PBar(props: Props) {
    const [animate, setAnimate] = React.useState(false)

    return (
        <div className={`${styles.container} ${animate ? styles.hideContainer : styles.showContainer}`}>
            <img onClick={() => {setAnimate(!animate)}} src='hide_arrow.png' alt='hide_arrow.png' className={`${styles.hideArrow} ${animate ? styles.turnHideArrow : null}`}></img>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <div className={styles.username}>Welcome,<br/>{props.username}</div>
                    <img className={styles.img} src={props.image} alt='profile_logo'></img>
                </div>
                <div>
                    <div onClick={() => {props.setPage(WhichPage.Profile)}} className={styles.link}>Profile</div>
                    <div onClick={() => {props.setPage(WhichPage.Oauth)}} className={styles.link}>Oauth</div>
                    <div onClick={() => {props.setPage(WhichPage.Services)}} className={styles.link}>Areas</div>
                    <div onClick={() => {props.deconnexion()}} className={styles.link}>Deconnexion</div>
                </div>
            </div>
        </div>
    )
}

export default PBar