import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string
// const redirectUri = ((process.env.NODE_ENV === 'development') ? process.env.REACT_APP_GITLAB_CALLBACK_DEV : process.env.REACT_APP_GITLAB_CALLBACK_PROD) as string;
// const clientSecret = process.env.REACT_APP_GOOGLE_SECRET as string

function GoogleAuthWidget() {
    const responseGoogle = (response: any) => {
        console.log(response);
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuthWidget