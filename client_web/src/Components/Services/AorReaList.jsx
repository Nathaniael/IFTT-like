import ButtonService from "./ButtonService";
import styles from './styles/Service.module.css'
import React from 'react'

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

export default AorReaList;