// Extern modules
import React from 'react';
import { useCookies } from 'react-cookie';
import { goToPage } from '../Utils';

// My modules
import Request from '../Request';

// Styles
import styles from './styles/LoginRegister.module.css';


// Types

// Used to switch between register and login
type Props = {
    setGotAccount: Function,
    gotAccount: boolean
};


// Component
function Register(props: Props) {
    const [errorMessage, setErrorMessage] = React.useState("")
    const [,setCookies] = useCookies()

    async function register(e: any) {
        // Prevent event from reloading the page
        e.preventDefault()

        // Get the user input values needed for register
        const username = e.target.children.username.value
        const email = e.target.children.email.value
        const password = e.target.children.password.value

        // Register request to the database by Request
        Request.register({username: username, email: email, password: password}).then((res) => {
            // Set the cookies to know that the user is now logged
            setCookies('logged', true)
            // Redirect to profile page
            goToPage("/profile")
        }).catch((err) => {
            // Write an error message under the form to help the user found out the problem of registration
            setErrorMessage(err)
        })
    }

    return (
        <div>
            <h1 className={styles.title}>Register</h1>
            {/* Register form */}
            <form className={styles.form} onSubmit={(e) => register(e)}>
                <input
                    className={styles.input}
                    placeholder='Username'
                    type='text'
                    name='username'/>
                <input
                    className={styles.input}
                    placeholder='Email'
                    type='text'
                    name='email'/>
                <input
                    className={styles.input}
                    placeholder='Password'
                    type='text'
                    name='password'/>
                <input
                    className={styles.button}
                    type='submit'
                    value='Envoyer'/>
            </form>
            {/* Zone of error message if a problem is encountered during registration */}
            <p>{errorMessage}</p>
            {/* Switch to the login form if the user already has an account */}
            <p className={styles.gotAccount} onClick={() => {props.setGotAccount(!props.gotAccount)}}>Already have an account ?</p>
        </div>
    )
}

export default Register;