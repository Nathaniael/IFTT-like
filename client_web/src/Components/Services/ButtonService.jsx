// Extern modules
import React from 'react'

import MoveComp from '../MoveComp'
import styles from './styles/Service.module.css'

function ButtonService ({ aOrRea, imgUrl, isAction, indexDraggable, setAorReaction }) {
    const [willDrag, setWillDrag] = React.useState(false)
    const selectorDrag = "draggable_" + (isAction ? "action" : "reaction") + indexDraggable

    function addElemToArea(isActionDest) {
        if (isAction !== isActionDest) {
            return
        }
        if (isAction) {
            setAorReaction({
                'id': aOrRea.id,
                'title': aOrRea.name,
                'imgUrl': imgUrl,
                'params': aOrRea.params,
                'help': aOrRea.help
            })
        } else { // Is a reaction
            setAorReaction({
                'id': aOrRea.id,
                'title': aOrRea.name,
                'imgUrl': imgUrl,
                'params': aOrRea.params,
                'help': aOrRea.help
            })
        }
    }
    return (
        <div>
            {willDrag ?
                <MoveComp selector={selectorDrag} addElemToArea={addElemToArea}></MoveComp>
            : null}
            <div onMouseEnter={() => {setWillDrag(true)}} className={styles.card} id={selectorDrag}>
                {aOrRea.name}
            </div>
        </div>
    )
}

export default ButtonService;