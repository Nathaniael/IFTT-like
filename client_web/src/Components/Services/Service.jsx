import React, { useState }from 'react'
import styles from './Service.module.css'
import AppBar from '../AppBar/AppBar'

const service = {
      "id": 1,
      "imgUrl": "/three/chrome.png",
      "action": [
          "See Post",
          "Retweet",
          "Fav Something",
          "Receive Message"
      ],
      "reaction": [
          "Post",
          "Retweet",
          "Fav Something",
          "Send Message"
      ]
}

function ButtonService ({ elem }) {
    const [clicked, setClicked] = useState(false)
    return (
        <div className={styles.buttonPadding}>
            <button className={`${styles.button} ${clicked ? styles.clicked : null}`} onClick={() => !clicked ? setClicked(true) : setClicked(false)}>{elem}</button>
        </div>
    )
}

function Service() {
    const [hover, setHover] = React.useState(false)
    return (
        <div className={styles.servicePage}>
            <AppBar></AppBar>
            <div className={styles.subDescriptionAction}>
                <div className={styles.littleTitle}>
                    Actions
                </div>
                <div>
                    {service?.action?.map((elem, index) => {
                        return (
                              <ButtonService key={index} elem={elem}></ButtonService> 
                        )
                    })}
                </div>
            </div>
            <img onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.imgUrl} alt={service?.imgUrl}></img>
            <div className={styles.subDescriptionReAction}>
                <div className={styles.littleTitle}>
                    ReActions
                </div>
                <div>
                    {service?.reaction?.map((elem, index) => {
                        return (
                            <div key={index}>
                                <ButtonService key={index} elem={elem}></ButtonService>
                            </div>
                        )
                    })}
                </div> 
            </div>
        </div>
  )
}

export default Service