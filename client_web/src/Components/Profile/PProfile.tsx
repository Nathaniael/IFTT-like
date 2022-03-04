import React from 'react'

type Props = {
    username: string,
    image: string,
    email: string
}

function PProfile(props: Props) {
    return (
        <div>
            <div>Profile of {props.username}</div>
            <img src={props.image}></img>
            <div>Email {props.email}</div>
        </div>
    )
}

export default PProfile