import React from 'react'
import styles from './ChooseService.module.css'

const listServices = [
    {
        "id": 1,
        "imgUrl": "three/chrome.png",
        "description": ""
    },
    {
        "id": 2,
        "imgUrl": "three/clashroyale.png"
    },
    {
        "id": 3,
        "imgUrl": "three/discord.png"
    },
    {
        "id": 4,
        "imgUrl": "three/facebook.png"
    },
    {
        "id": 5,
        "imgUrl": "three/fortnite.png"
    },
    {
        "id": 6,
        "imgUrl": "three/reddit.png"
    },
    {
        "id": 7,
        "imgUrl": "three/tft.png"
    },
    {
        "id": 8,
        "imgUrl": "three/twitter.png"
    },
]

function DescriptionWidget({ hidden, onLeft }) {
    return (
        <div className={`${styles.descriptionService} ${hidden ? styles.hidden : null} ${onLeft ? styles.descriptionLeft : styles.descriptionRight}`}>BLABLA<br/>BLABLA<br/></div>
    )
}

function ServiceWidget({ imgUrl, onLeft }) {
    const [clicked, setClicked] = React.useState(false)

    return (
        <div>
            <DescriptionWidget hidden={!clicked} onLeft={onLeft}></DescriptionWidget>    
            <img onMouseEnter={() => {setClicked(true)}} onMouseLeave={() => {setClicked(false)}} className={`${styles.serviceLogo} ${clicked ? styles.logoGoCenter : null}`} src={imgUrl} alt={imgUrl}></img>
        </div>
    )
}

function ChooseService() {
  return (
    <div className={styles.listServices}>
        {listServices?.map((elem, index) => {
            return (
                <ServiceWidget key={elem?.id} imgUrl={elem?.imgUrl} onLeft={index % 2 == 0 ? true : false}></ServiceWidget>
            )
        })}
    </div>
  )
}

export default ChooseService