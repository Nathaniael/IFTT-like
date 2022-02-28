import React from 'react';
import styles from './Login.module.css';
import Request from '../Request';
import { useCookies } from 'react-cookie';

function RegisterForm({ setGotAccount, gotAccount }) {
    const [errorMessage, setErrorMessage] = React.useState("")
    const [cookies, setCookies] = useCookies()

    async function register(e) {
        e.preventDefault()
        const username = e.target.children.username.value
        const email = e.target.children.email.value
        const password = e.target.children.password.value

        Request.register(username, email, password).then((res) => {
            if (res.success) {
                setCookies('logged', true, { path: '/' })
                window.location.href = window.location.href.split("/")[0] + "/profile"
            } else {
                setErrorMessage(res.message)
            }
        }).catch((err) => {
            setErrorMessage("Unexpected error")
        })
    }

    return (
        <div>
            <h1 className={styles.title}>Register</h1>
            <form className={styles.form} onSubmit={(e) => register(e)}>
                <input className={styles.input} placeholder='Username' type='text' name='username'/>
                <input className={styles.input} placeholder='Email' type='text' name='email'/>
                <input className={styles.input} placeholder='Password' type='text' name='password'/>
                <input className={styles.button} type='submit' value='Envoyer'/>
            </form>
            <p>{errorMessage}</p>
            <p className={styles.gotAccount} onClick={() => {setGotAccount(!gotAccount)}}>Already have an account ?</p>
        </div>
    )
}

export default RegisterForm;