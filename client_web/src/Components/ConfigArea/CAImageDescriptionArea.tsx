// Extern modules
import React from 'react';

// Styles
import styles from './styles/CAImageDescriptionArea.module.css'


// Types
type Props = {
    imgUrl: string,
    description: string
}


// Component
function CAImageDescriptionArea(props: Props) {
    return (
        <div
            className={styles.container}>
            <img
                src={props.imgUrl}
                alt={props.imgUrl}
            ></img>
            <div>
                {props.description}
            </div>
        </div>
    )
}

export default CAImageDescriptionArea;