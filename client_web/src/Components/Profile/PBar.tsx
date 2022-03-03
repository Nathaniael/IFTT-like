import React from 'react'
import styles from './styles/PBar.module.css'
import { WhichPage } from '../../Types/Types'

type Props = {
    setPage: Function,
    deconnexion: Function
};

function PBar(props: Props) {
    const [animate, setAnimate] = React.useState(true)

    return (
        <div className={`${styles.container} ${animate ? styles.hideContainer : styles.showContainer}`}>
            <img onClick={() => {setAnimate(!animate)}} src='hide_arrow.png' alt='hide_arrow.png' className={`${styles.hideArrow} ${animate ? styles.turnHideArrow : null}`}></img>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <div className={styles.username}>Welcome,<br/>Kilian Le Calvez</div>
                    <img className={styles.img} src='/github.png' alt=''></img>
                </div>
                <div>
                    <div onClick={() => {props.setPage(WhichPage.Profile)}} className={styles.link}>Profile</div>
                    <div onClick={() => {props.setPage(WhichPage.Oauth)}} className={styles.link}>Oauth</div>
                    <div onClick={() => {props.setPage(WhichPage.Services)}} className={styles.link}>Services</div>
                    <div onClick={() => {props.deconnexion()}} className={styles.link}>Deconnexion</div>
                </div>
            </div>
        </div>
    )
}

export default PBar