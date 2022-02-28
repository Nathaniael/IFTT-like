import React from 'react'
import Request from '../Request'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

function Profile() {
    const [cookies, setCookies, removeCookie] = useCookies(["logged", "access_token", "user"])

    React.useState(() => {
        Request.getProfile().then((res) => {
            setCookies("user", res)
        }).catch((err) => {
            console.log(err)
        })    
    }, [])
    
    function resetCookie() {
        removeCookie("logged")
        removeCookie("access_token")
        removeCookie("user")
        window.location.href = window.location.href.split("/")[0] + "/login"
    }
    return (
        <div>
            {cookies.user ?
                <div>Profile of
                    <br/>
                    {cookies?.user?.username}
                    <button onClick={() => {resetCookie()}}>LOGOUT</button>
                </div>
            : 
                <Link to="/login">LOG TOI</Link>
            }
        </div>
    )
}

export default Profile