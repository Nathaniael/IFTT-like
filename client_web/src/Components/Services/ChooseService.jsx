import React from 'react'
import styles from './ChooseService.module.css'
import { Link } from 'react-router-dom'
import AppBar from "../AppBar/AppBar";
import ConfigArea from '../ConfigArea/ConfigArea';

const listServices = [
    {
        "id": 1,
        "imgUrl": "three/chrome.png",
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
    },
    {
        "id": 2,
        "imgUrl": "three/twitter.png",
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
    },
    {
        "id": 3,
        "imgUrl": "three/discord.png",
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
    },
    {
        "id": 4,
        "imgUrl": "three/facebook.png",
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
    },
    {
        "id": 5,
        "imgUrl": "three/clashroyale.png",
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
    },
    {
        "id": 6,
        "imgUrl": "three/reddit.png",
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
    },
    {
        "id": 7,
        "imgUrl": "three/tft.png",
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
    },
    {
        "id": 8,
        "imgUrl": "three/fortnite.png",
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
    },
]

function SubDescription({ title, list }) {
    return (
        <div className={styles.subDescription}>
            <div className={styles.littleTitle}>
                {title}
            </div>
            <div>
            {list?.map((elem, index) => {
                return (
                    <div key={index} className={styles.littleElem}>
                        {elem}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

function DescriptionWidget({ hidden, onLeft, action, reaction }) {
    return (
        <div className={`${styles.descriptionService} ${hidden ? styles.hidden : null} ${onLeft ? styles.descriptionLeft : styles.descriptionRight}`}>
            <SubDescription title="Actions" list={action}></SubDescription>
            <SubDescription title="ReActions" list={reaction}></SubDescription>
        </div>
    )
}

function ServiceWidget({ service, onLeft }) {
    const [hover, setHover] = React.useState(false)

    return (
        <div>
            <DescriptionWidget hidden={!hover} onLeft={onLeft} action={service?.action} reaction={service?.reaction}></DescriptionWidget>
            <Link to={`/services/${service.id}`}>
            <img onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.imgUrl} alt={service?.imgUrl}></img>
            </Link>  
        </div>
    )
}

function ChooseService() {
  return (
    <div className={styles.servicePage}>
        <AppBar></AppBar>
        <ConfigArea></ConfigArea>
        <div className={styles.servicePageBody}>
            <div className={styles.titlePage}>Services</div>
            <div className={styles.listServices}>
                {listServices?.map((elem, index) => {
                    return (
                        <ServiceWidget key={elem?.id} service={elem} onLeft={index % 2 === 0 ? true : false}></ServiceWidget>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ChooseService