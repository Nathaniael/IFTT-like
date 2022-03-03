import React from 'react'
import styles from './styles/Service.module.css'
import AorReaList from './AorReaList'

function Service({setActiveService, service, setAction, setReaction}) {
    const [hover, setHover] = React.useState(false)

    return (
        <div className={styles.servicePage}>
            <div className={styles.pagination}>
                <AorReaList title="Actions" service={service} isAction={true} setAorReaction={setAction}></AorReaList>
                <img onClick={() => {setActiveService(undefined)}} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.logo} alt={service?.logo}></img>
                <AorReaList title="Reactions" service={service} isAction={false} setAorReaction={setReaction}></AorReaList>
            </div>    
        </div>
  )
}

export default Service