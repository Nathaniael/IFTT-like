// Extern modules
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useCookies } from 'react-cookie';

// My modules
import Request from '../Request';
import { goToPage } from '../Utils';

// Env variables
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string

// Types
type Props = {
    setErrorMessage: Function
};


// Component
function GoogleAuthWidget(props: Props) {
    const [, setCookies] = useCookies(['logged'])

    const validResponse = (response: any) => {
        const username = response.profileObj.name
        const email = response.profileObj.email
        const password = response.profileObj.googleId
        const image = response.profileObj.imageUrl

        // Try to log then try to register user from google infos oauth
        Request.login({email: email, password: password}).then((res) => {
            // Set the cookies to know that the user is now logged
            setCookies('logged', true)
            // Redirect to profile page
            goToPage("/profile")
        }).catch((err) => {
            Request.register({username: username, email: email, password: password, image: image}).then((res) => {
                // Set the cookies to know that the user is now logged
                setCookies('logged', true)
                // Redirect to profile page
                goToPage("/profile")
            }).catch((err) => {
                // Write an error message under the form to help the user found out the problem of registration
                props.setErrorMessage(err)
            })
        })
    }

    const errorResponse = (response: any) => {
        props.setErrorMessage("Can't connect with google")
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={validResponse}
                onFailure={errorResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuthWidget