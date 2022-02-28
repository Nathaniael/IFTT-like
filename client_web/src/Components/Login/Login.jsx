import React from 'react';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import styles from './Login.module.css';
import AppBar from '../AppBar/AppBar'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Login() {
    const [gotAccount, setGotAccount] = React.useState(true)

    return (
        <div className={styles.background}>
            <AppBar></AppBar>
            <div className={styles.logWidget}>
                <div>
                    {!gotAccount ?
                        <RegisterForm setGotAccount={setGotAccount} gotAccount={gotAccount}></RegisterForm>
                        :
                        <LoginForm setGotAccount={setGotAccount} gotAccount={gotAccount}></LoginForm>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;
