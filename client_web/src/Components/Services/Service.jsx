import React from 'react'
import styles from './ChooseService.module.css'

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

function Service({}) {
  return (
    <div className={styles.servicePage}>
      <div className={styles.subDescription}>
        <div className={styles.littleTitle}>
            Actions
        </div>
        <div>
            {service?.action?.map((elem, index) => {
              return (
                  <div key={index} className={styles.littleElem}>
                      {elem}
                  </div>
              )
          })}
        </div>
        </div>
        <img src={service?.imgUrl} alt={service?.imgUrl} className={styles.logoGoCenter}></img>
        <div className={styles.subDescription}>
        <div className={styles.littleTitle}>
            ReActions
        </div>
        <div>
            {service?.reaction?.map((elem, index) => {
              return (
                  <div key={index} className={styles.littleElem}>
                      {elem}
                  </div>
              )
          })}
        </div>
        </div>
    </div>
  )
}

export default Service