import { GoogleLogin } from 'react-google-login'

import React from 'react'

function test() {
  return (
    <div><GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
/></div>
  )
}

export default test