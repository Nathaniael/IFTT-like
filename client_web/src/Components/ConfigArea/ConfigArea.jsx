import React from 'react'
import styles from './ConfigArea.module.css'

function ImgTextContainer({ imgUrl, text }) {
    return (
        <div className={styles.imgTextContainer}>
            <img src={imgUrl} alt={imgUrl}></img>
            <div>{text}</div>
        </div>
    )
}

function Params({params}) {
    function modifyValues(id) {
        var value = document.getElementById(id).value
        console.log(value)
    }
    return (
        <div>{JSON.parse(params).map((elem, index) => {
            return (
                <div key={index}>
                    {elem?.number ?
                        <input type="text" placeholder={elem.number} id={elem.number} onChange={() => {modifyValues(elem.number)}}></input>
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
    let defaultEmptyList = "[]"
    return (
        <div className={styles.configContainer}>
            {activeService !== undefined ?
                <div onClick={() => {setActiveService(undefined)}} className={styles.arrow}>➡️</div>
            : null}
            <div id="ImgTextContainerAction" onClick={() => {setAction(undefined)}}>
                <ImgTextContainer
                    text={action?.title ? action.title : defaultActionTitle}
                    imgUrl={action?.imgUrl ? action.imgUrl : placeHolderUrl}></ImgTextContainer>
                <Params params={action?.params ? action.params : defaultEmptyList}></Params>
            </div>
            <div className={styles.arrow}>➡️</div>
            <div id="ImgTextContainerReaction" onClick={() => {setReaction(undefined)}}>
                <ImgTextContainer
                    text={reaction?.title ? reaction.title : defaultReactionTitle}
                    imgUrl={reaction?.imgUrl ? reaction.imgUrl : placeHolderUrl}></ImgTextContainer>
                <Params params={reaction?.params ? reaction.params : defaultEmptyList}></Params>
            </div>
        </div>
    )
}

export default ConfigArea