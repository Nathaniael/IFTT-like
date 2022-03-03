import React from 'react'
import { randomString } from '../Utils';
import qs from 'qs'

// Authorized scopes
// api (Access the authenticated user's API)
// read_api (Read Api)
// read_user (Read the authenticated user's personal information)
// read_repository (Allows read-only access to the repository)
// read_registry (Grants permission to read container registry images)
// openid (Authenticate using OpenID Connect)
// profile (Allows read-only access to the user's personal information using OpenID Connect)
// email

const applicationId = process.env.REACT_APP_GITLAB_APPLICATION_ID as string
const redirectUri = ((process.env.NODE_ENV === 'development') ? process.env.REACT_APP_GITLAB_CALLBACK_DEV : process.env.REACT_APP_GITLAB_CALLBACK_PROD) as string;

function GitLabAuthWidget() {
  React.useEffect(() => {
    const params = {
      client_id: applicationId,
      redirect_uri: redirectUri,
      response_type: "code",
      state: randomString(50),
      scope: "api"
    }
    const urlParams = qs.stringify(params)
    window.location.href = "https://gitlab.com/oauth/authorize?" + urlParams
  }, [])
  return (
    <div>Loading</div>
  )
}

// "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."

export default GitLabAuthWidget