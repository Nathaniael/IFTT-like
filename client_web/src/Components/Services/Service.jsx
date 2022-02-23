import React, { useState }from 'react'
import styles from './Service.module.css'
import AppBar from '../AppBar/AppBar'
import { useCookies } from 'react-cookie'
import ConfigArea from '../ConfigArea/ConfigArea'
import MoveComp from '../MoveComp'

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
          "Post reaction",
          "Retweet reaction",
          "Fav Something reaction",
          "Send Message reaction"
      ]
}

function ButtonService ({ title, imgUrl, isAction, indexDraggable }) {
    const [cookie, setCookies, removeCookies] = useCookies()
    const [willDrag, setWillDrag] = React.useState(false)
    const selectorDrag = "draggable_" + (isAction ? "action" : "reaction") + indexDraggable

    function addElemToArea(isActionDest) {
        if (isAction != isActionDest) {
            return
        }
        if (isAction) {
            setCookies('action', {
                'title': title,
                'imgUrl': imgUrl
            })
        } else { // Is a reaction
            setCookies('reaction', {
                'title': title,
                'imgUrl': imgUrl
            })
        }
    }
    return (
        <div>
            {willDrag ?
                <MoveComp selector={selectorDrag} addElemToArea={addElemToArea}></MoveComp>
            : null}
            <div onMouseEnter={() => {setWillDrag(true)}} className={`${styles.buttonPadding}`} id={selectorDrag}>
                <button className={`${styles.button}`} onClick={() => {addElemToArea()}}>{title}</button>
            </div>
        </div>
    )
}

function AorReaList({ title, service, isAction }) {
    const list = isAction ? service?.action : service?.reaction
    console.log(list)
    return (
        <div className={styles.subDescriptionAction}>
            <div className={styles.littleTitle}>
                {title}
            </div>
            <div>
                {list?.map((elem, index) => {
                    return (
                        <ButtonService
                            key={index}
                            title={elem}
                            imgUrl={service?.imgUrl}
                            isAction={isAction}
                            indexDraggable={index}
                        ></ButtonService> 
                )
                })}
            </div>
        </div>
    )
}
function Service() {
    const [hover, setHover] = React.useState(false)
    return (
        <div className={styles.servicePage}>
            <AppBar></AppBar>
            <ConfigArea></ConfigArea>
            <div className={styles.pagination}>
                <AorReaList title="Actions" service={service} isAction={true}></AorReaList>
                <img onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.imgUrl} alt={service?.imgUrl}></img>
                <AorReaList title="Reactions" service={service} isAction={false}></AorReaList>
            </div>    
        </div>
  )
}

export default Service