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
function ConfigArea() {
    const [cookie, , removeCookies] = useCookies()

    let placeHolderUrl = "/areaPlaceHolder.png"
    let defaultActionTitle = "No action selected"
    let defaultReactionTitle = "No reaction selected"
    return (
        <div className={styles.configContainer}>
            <div id="ImgTextContainerAction" onClick={() => {removeCookies('action')}}>
                <ImgTextContainer
                    text={cookie?.action?.title ? cookie.action.title : defaultActionTitle}
                    imgUrl={cookie?.action?.imgUrl ? cookie.action.imgUrl : placeHolderUrl}></ImgTextContainer>
            </div>
            <div className={styles.arrow}>➡️</div>
            <div id="ImgTextContainerReaction" onClick={() => {removeCookies('reaction')}}>
                <ImgTextContainer
                    text={cookie?.reaction?.title ? cookie.reaction.title : defaultReactionTitle}
                    imgUrl={cookie?.reaction?.imgUrl ? cookie.reaction.imgUrl : placeHolderUrl}></ImgTextContainer>
            </div>
        </div>
    )
}

export default ConfigArea