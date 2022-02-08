import React from 'react';
import styles from './Login.module.css';

function test() {

}

function Login() {
    return (
        <div>
            <form>
                <input className={styles.input} type='text' name='name'/>
                <input className={styles.input} type='submit' value='Envoyer'/>
            </form>
            <button onClick={() => {test()}}>TEST</button>
        </div>
    )
}

export default Login;
