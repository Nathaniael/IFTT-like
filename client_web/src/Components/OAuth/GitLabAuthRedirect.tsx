import React from 'react'
import Request from '../Request';
import { useCookies } from 'react-cookie';
import { goToPage } from '../Utils';

function GitLabAuthRedirect() {
    const [cookies, setCookies] = useCookies(['gitlab_token'])
    var code;
    var state;

    React.useEffect(() => {
        code = window.location.href.split("?code=")[1].split("&state=")[0]
        state = window.location.href.split("?code=")[1].split("&state=")[1]
        Request.getAccessToken(code, state).then((res) => {
            console.log(res.access_token)
            setCookies('gitlab_token', res.access_token, {path: '/'})
            goToPage('/profile')
        }).catch((err) => {
            console.log(err.response)
        })
    }, [])
    return (
        <div>GitLabAuthRedirect</div>
    )
}

export default GitLabAuthRedirect