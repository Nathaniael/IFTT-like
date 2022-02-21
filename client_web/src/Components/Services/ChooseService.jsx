import React from 'react'
import styles from './ChooseService.module.css'

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
    const [clicked, setClicked] = React.useState(false)

    return (
        <div>
            <DescriptionWidget hidden={!clicked} onLeft={onLeft} action={service?.action} reaction={service?.reaction}></DescriptionWidget>    
            <img onMouseEnter={() => {setClicked(true)}} onMouseLeave={() => {setClicked(false)}} className={`${styles.serviceLogo} ${clicked ? styles.logoGoCenter : null}`} src={service?.imgUrl} alt={service?.imgUrl}></img>
        </div>
    )
}

function ChooseService() {
  return (
    <div className={styles.servicePage}>
        <div className={styles.listServices}>
            {listServices?.map((elem, index) => {
                return (
                    <ServiceWidget key={elem?.id} service={elem} onLeft={index % 2 == 0 ? true : false}></ServiceWidget>
                )
            })}
        </div>
    </div>
  )
}

export default ChooseService