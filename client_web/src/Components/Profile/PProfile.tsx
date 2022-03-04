import React from 'react'
import styles from './styles/PProfile.module.css'
import Request from '../Request'

type Props = {
    username: string,
    image: string,
    email: string,
    update: Function
}

type UsernameProps = {
    username: string,
    update: Function
}
function UsernameWidget(props: UsernameProps) {
    const [error, setError] = React.useState("Click on your username to change it")

    async function popError() {
        setError("Click on your username to change it")
    }

    function changeUsername(e: any) {
        if (e.target.value.length < 4) {
            setError("At least 4 characters long")
            setTimeout(popError, 1000)
        } else if (props.username !== e.target.value) {
            Request.postUsername(e.target.value).then((res) => {
                setError(res)
                setTimeout(popError, 1000)    
                props.update()
            }).catch((err) => {
                setError("Could not change the username")
                setTimeout(popError, 1000)
            })
        }
    }

    return (
        <>
            <div className={styles.headerRow}>
                <div className={styles.headerText}>Profile of</div>
                <input onBlur={(e) => {changeUsername(e)}} defaultValue={props.username} placeholder='New username' className={styles.headerUsername}></input>
            </div>
            <div>{error}</div>
        </>
    )
}

function PProfile(props: Props) {

    return (
        <div className={styles.profile}>
            <div className={styles.header}>
                <UsernameWidget username={props.username} update={props.update}></UsernameWidget>
                <img className={styles.headerImg} src={props.image}></img>
            </div>
            <div>Email {props.email}</div>
        </div>
    )
}

export default PProfile