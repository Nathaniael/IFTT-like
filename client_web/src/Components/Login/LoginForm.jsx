import React from 'react';
import styles from './Login.module.css';
import Request from '../Request';
import { useCookies } from 'react-cookie';
import{ goToPage }from '../Utils';

function LoginForm({ setGotAccount, gotAccount }) {
    const [errorMessage, setErrorMessage] = React.useState("")
    const [,setCookies] = useCookies()

    async function login(e) {
        e.preventDefault()
        const usernameOrEmail = e.target.children.usernameOrEmail.value
        const password = e.target.children.password.value

        Request.login({usernameOrEmail, password}).then((res) => {
            setCookies('logged')
            goToPage("/profile")
        }).catch((err) => {
            setErrorMessage(err)
        })
    }
    return (
        <div>
            <h1 className={styles.title}>LOGIN</h1>
            <form className={styles.form} onSubmit={(e) => login(e)}>
                <input className={styles.input} placeholder='Username / Email' type='text' name='usernameOrEmail'/>
                <input className={styles.input} placeholder='Password' type='text' name='password'/>
                <input className={styles.button} type='submit' value='Envoyer'/>
            </form>
            <p>{errorMessage}</p>
            <p className={styles.gotAccount} onClick={() => {setGotAccount(!gotAccount)}}>Still don't have an account ?</p>
        </div>
    )
}

export default LoginForm;
