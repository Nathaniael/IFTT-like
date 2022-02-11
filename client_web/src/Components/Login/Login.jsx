import React from 'react';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import styles from './Login.module.css';

function Logged({ setLogged, username }) {
    return (
        <div>
            <h1 className={styles.title}>Welcome {username}</h1>
            <div className={styles.sizedBox100pxH}></div>
            <div className={styles.button} onClick={() => {setLogged(false)}}>Deconnexion</div>
        </div>
    )
}
function Login() {
    const [logged, setLogged] = React.useState(false)
    const [gotAccount, setGotAccount] = React.useState(false)
    const [username, setUsername] = React.useState("Baptiste")

    return (
        <div className={styles.logWidget}>
            <p onClick={() => {setLogged(!logged)}}>Hack</p>
            {!logged ?
                <div>
                    {!gotAccount ?
                        <RegisterForm setLogged={setLogged} setGotAccount={setGotAccount} gotAccount={gotAccount}></RegisterForm>
                        :
                        <LoginForm setLogged={setLogged} setGotAccount={setGotAccount} gotAccount={gotAccount}></LoginForm>
                    }
                </div>
            : <Logged setLogged={setLogged} username={username}></Logged> }
        </div>
    )
}

export default Login;
