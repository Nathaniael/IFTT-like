// Extern modules
import React from 'react'


// Styles
import styles from './styles/CAParams.module.css'


// Types
type Props = {
    params: any
};


// Component
function OneParam(props: any) {
    // State of a value, either undefined, valid or not valid
    const [valid, setValid] = React.useState(undefined) as any

    function checkValidity(value: string, isNumber: boolean) {
        // Value is valid if is number and not null and not undefined
        if (isNumber) {
            const checkValue = Number(value)
            if (value === "" && value !== undefined) {
                setValid(false)
            } else if (Number.isInteger(checkValue)) {
                setValid(true)
            } else {
                setValid(false)
            }
        // Value is valid if not null and not undefined
        } else {
            if (value !== "" && value !== undefined) {
                setValid(true)
            } else {
                setValid(false)
            }
        }
    }

    return (
        <div className={styles.item}>
            {/* Number param needed */}
            {props.elem?.number ?
                <input
                    autoComplete='off'
                    onChange={(e) => {checkValidity(e.target.value, true)}}
                    // Change style depending on value state (undefined / valid / not valid)
                    className={`${styles.input} ${valid === undefined ? null : (valid ? styles.validInput : styles.errorInput)}`}
                    type="text" placeholder={props.elem.number} id={props.elem.number}></input>
                :
                null
            }
            {props.elem?.string ?
                <input
                    autoComplete='off'
                    onChange={(e) => {checkValidity(e.target.value, false)}}
                    // Change style depending on value state (undefined / valid / not valid)
                    className={`${styles.input} ${valid === undefined ? null : (valid ? styles.validInput : styles.errorInput)}`}
                    type="text" placeholder={props.elem.string} id={props.elem.string}></input>
                :
                null
            }
        </div>
    )
}

// Component
function CAParams(props: Props) {
    return (
        <div className={styles.params}>
            {/* Action for every params model given by the server to set action / reaction parameters in area */}
            {props.params?.map((elem: any, index: number) => {
                return (
                    <OneParam elem={elem} key={index}></OneParam>
                )
            })}
        </div>
    )
}

export default CAParams;