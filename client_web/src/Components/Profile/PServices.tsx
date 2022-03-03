import React from 'react'
import Request from '../Request'

function PServices() {
    const [areas, setAreas] = React.useState([])

    React.useEffect(() => {
        Request.getAreas().then((res) => {
            setAreas(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            {areas.map((elem: any, index: number) => {
                return (
                    <div key={index}>
                        <img src={elem?.action?.service?.logo} alt="logo"/>
                        <img src={elem?.reaction?.service?.logo} alt="logo"/>
                    </div>
                )
            })}
        </div>
    )
}

export default PServices