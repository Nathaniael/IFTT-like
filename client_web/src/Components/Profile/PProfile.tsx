import React from 'react'

type Props = {
    username: string
}

function PProfile(props: Props) {
    return (
        <div>Profile of {props.username}</div>
    )
}

export default PProfile