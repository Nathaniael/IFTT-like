import React from 'react'
import Request from '../Request'

function Profile() {
    Request.getProfile().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
    
    return (
        <div>Profile</div>
    )
}

export default Profile