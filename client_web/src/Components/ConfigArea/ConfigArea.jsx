import React from 'react'
import styles from './ConfigArea.module.css'
import Request from '../Request'

function ImgTextContainer({ imgUrl, text }) {
    return (
        <div className={styles.imgTextContainer}>
            <img src={imgUrl} alt={imgUrl}></img>
            <div>{text}</div>
        </div>
    )
}

function Params({params}) {
    return (
        <div>{params.map((elem, index) => {
            // console.log(elem)
            return (
                <div key={index}>
                    {elem?.number ?
                        <input type="text" placeholder={elem.number} id={elem.number}></input>
                        : null
                    }    
                    {elem?.string ?
                        <input type="text" placeholder={elem.string} id={elem.string}></input>
                        : null
                    }
                </div>
            )
        })}</div>
    )
}
function ConfigArea({activeService, setActiveService, action, reaction, setAction, setReaction}) {
    let placeHolderUrl = "/areaPlaceHolder.png"
    let defaultActionTitle = "No action selected"
    let defaultReactionTitle = "No reaction selected"

    const [actionParams, setActionParams] = React.useState([])
    const [reactionParams, setReactionParams] = React.useState([])

    React.useEffect(() => {
        if (action?.params) {
            setActionParams(JSON.parse(action.params))
        } else {
            setActionParams([])
        }
        if (reaction?.params) {
            setReactionParams(JSON.parse(reaction.params))
        } else {
            setReactionParams([])
        }
    }, [action, reaction])

    function createArea() {
        var createAreaDatas = {
            "action_id": action?.id,
            "reaction_id": reaction?.id,
            "action_params": {},
            "reaction_params": {}
        }
        for (const param of actionParams) {
            var inputId;
            if (param.number) {
                inputId = param.number
            }
            if (param.string) {
                inputId = param.string
            }
            var inputElem = document.getElementById(inputId)
            createAreaDatas["action_params"][inputId] = param.number ? parseInt(inputElem.value) : inputElem.value
        }
        for (const param of reactionParams) {
            var inputId;
            if (param.number) {
                inputId = param.number
            }
            if (param.string) {
                inputId = param.string
            }
            var inputElem = document.getElementById(inputId)
            createAreaDatas["reaction_params"][inputId] = param.number ? parseInt(inputElem.value) : inputElem.value
        }
        Request.createArea(createAreaDatas).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className={styles.configContainer}>
            {activeService !== undefined ?
                <div onClick={() => {setActiveService(undefined)}} className={styles.arrow}>⬅️</div>
            : null}
            <div className={styles.confAreaBox}>
                <div id="ImgTextContainerAction" onClick={() => {setAction(undefined)}}>
                    <ImgTextContainer
                        text={action?.title ? action.title : defaultActionTitle}
                        imgUrl={action?.imgUrl ? action.imgUrl : placeHolderUrl}></ImgTextContainer>
                </div>
                <Params params={actionParams}></Params>
            </div>
            <div onClick={() => {createArea()}} className={styles.arrow}>➡️</div>
            <div className={styles.confAreaBox}>
                <div id="ImgTextContainerReaction" onClick={() => {setReaction(undefined)}}>
                    <ImgTextContainer
                        text={reaction?.title ? reaction.title : defaultReactionTitle}
                        imgUrl={reaction?.imgUrl ? reaction.imgUrl : placeHolderUrl}></ImgTextContainer>
                </div>
                <Params params={reactionParams}></Params>
            </div>
        </div>
    )
}

export default ConfigArea