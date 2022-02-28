import React from 'react'
import styles from './ConfigArea.module.css'
import { useCookies } from 'react-cookie'

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
function ConfigArea() {
    const [cookie, , removeCookies] = useCookies(["action", "reaction"])

    let placeHolderUrl = "/areaPlaceHolder.png"
    let defaultActionTitle = "No action selected"
    let defaultReactionTitle = "No reaction selected"
    let defaultEmptyList = "[]"
    return (
        <div className={styles.configContainer}>
            <div id="ImgTextContainerAction" onClick={() => {removeCookies("action")}}>
                <ImgTextContainer
                    text={cookie?.action?.title ? cookie.action.title : defaultActionTitle}
                    imgUrl={cookie?.action?.imgUrl ? cookie.action.imgUrl : placeHolderUrl}></ImgTextContainer>
                <Params params={cookie?.action?.params ? cookie.action.params : defaultEmptyList}></Params>
            </div>
            <div className={styles.arrow}>➡️</div>
            <div id="ImgTextContainerReaction" onClick={() => {removeCookies("reaction")}}>
                <ImgTextContainer
                    text={cookie?.reaction?.title ? cookie.reaction.title : defaultReactionTitle}
                    imgUrl={cookie?.reaction?.imgUrl ? cookie.reaction.imgUrl : placeHolderUrl}></ImgTextContainer>
            </div>
        </div>
    )
}

export default ConfigArea