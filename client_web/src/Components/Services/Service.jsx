import React, { useState }from 'react'
import styles from './Service.module.css'
import AppBar from '../AppBar/AppBar'
import { useCookies } from 'react-cookie'
import ConfigArea from '../ConfigArea/ConfigArea'
import MoveComp from '../MoveComp'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// const service = {
//       "id": 1,
//       "imgUrl": "/three/chrome.png",
//       "action": [
//           "See Post",
//           "Retweet",
//           "Fav Something",
//           "Receive Message"
//       ],
//       "reaction": [
//           "Post reaction",
//           "Retweet reaction",
//           "Fav Something reaction",
//           "Send Message reaction"
//       ]
// }

function ButtonService ({ aOrRea, imgUrl, isAction, indexDraggable }) {
    const [cookie, setCookies, removeCookies] = useCookies()
    const [willDrag, setWillDrag] = React.useState(false)
    const selectorDrag = "draggable_" + (isAction ? "action" : "reaction") + indexDraggable

    function addElemToArea(isActionDest) {
        if (isAction != isActionDest) {
            return
        }
        if (isAction) {
            setCookies('action', {
                'id': aOrRea.id,
                'title': aOrRea.name,
                'imgUrl': imgUrl
            })
        } else { // Is a reaction
            setCookies('reaction', {
                'id': aOrRea.id,
                'title': aOrRea.name,
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
                <button className={`${styles.button}`}>{aOrRea.name}</button>
            </div>
        </div>
    )
}

function AorReaList({ title, service, isAction }) {
    const list = isAction ? service?.actions : service?.reactions
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
                            aOrRea={elem}
                            imgUrl={service?.logo}
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
    const location = useLocation()
    const { service } = location.state;

    console.log("HELLO",service)
    return (
        <div className={styles.servicePage}>
            <AppBar></AppBar>
            <ConfigArea></ConfigArea>
            <div className={styles.pagination}>
                <AorReaList title="Actions" service={service} isAction={true}></AorReaList>
                <img onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.logo} alt={service?.logo}></img>
                <AorReaList title="Reactions" service={service} isAction={false}></AorReaList>
            </div>    
        </div>
  )
}

export default Service