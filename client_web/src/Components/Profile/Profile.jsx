import React from 'react'
import Request from '../Request'
import { useCookies } from 'react-cookie'

function Profile() {
    const [cookies, setCookies] = useCookies()
    console.log(cookies.access_token)

    Request.getProfile().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
    
    return (
        <div>Profile
            <button onClick={() => {setCookies('logged', false, { path: '/' });}}>LOGOUT</button>
        </div>
    )
}

export default Profile