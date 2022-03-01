import React from 'react'
import styles from './Service.module.css'
import MoveComp from '../MoveComp'

function ButtonService ({ aOrRea, imgUrl, isAction, indexDraggable, setAorReaction }) {
    const [willDrag, setWillDrag] = React.useState(false)
    const selectorDrag = "draggable_" + (isAction ? "action" : "reaction") + indexDraggable

    function addElemToArea(isActionDest) {
        if (isAction !== isActionDest) {
            return
        }
        console.log(isAction, isActionDest, aOrRea)
        if (isAction) {
            console.log("Drag action", setAorReaction)
            setAorReaction({
                'id': aOrRea.id,
                'title': aOrRea.name,
                'imgUrl': imgUrl,
                'params': aOrRea.params
            })
        } else { // Is a reaction
            console.log("Drag reaction", setAorReaction)
            setAorReaction({
                'id': aOrRea.id,
                'title': aOrRea.name,
                'imgUrl': imgUrl,
                'params': aOrRea.params
            })
            console.log("Drag reaction")
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

function AorReaList({ title, service, isAction, setAorReaction }) {
    const list = isAction ? service?.actions : service?.reactions
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
                            setAorReaction={setAorReaction}
                            indexDraggable={index}
                        ></ButtonService> 
                )
                })}
            </div>
        </div>
    )
}
function Service({service, setAction, setReaction}) {
    const [hover, setHover] = React.useState(false)

    console.log(setAction)
    console.log(setReaction)
    return (
        <div className={styles.servicePage}>
            <div className={styles.pagination}>
                <AorReaList title="Actions" service={service} isAction={true} setAorReaction={setAction}></AorReaList>
                <img onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.logo} alt={service?.logo}></img>
                <AorReaList title="Reactions" service={service} isAction={false} setAorReaction={setReaction}></AorReaList>
            </div>    
        </div>
  )
}

export default Service