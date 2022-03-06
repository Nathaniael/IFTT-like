import React from 'react'
import styles from './styles/Service.module.css'
import AorReaList from './AorReaList'

function Service({setActiveService, service, setAction, setReaction}) {
    const [hover, setHover] = React.useState(false)
    console.log(service?.actions.length === 0)
    console.log(service?.reactions.length === 0)
    return (
        <div className={styles.servicePage}>
            
            {service?.actions.length !== 0 ?
                <div className={styles.littleTitleLeft}>Actions</div>
            : null}
            {service?.reactions.length !== 0 ?
                <div className={styles.littleTitleRight}>Reactions</div>
            : null}
            <div className={styles.pagination}>
                {service?.actions.length !== 0 ?
                    <AorReaList title="Actions" service={service} isAction={true} setAorReaction={setAction}></AorReaList>
                : null}
                <img onClick={() => {setActiveService(undefined)}} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.logo} alt={service?.logo}></img>
                {service?.reactions.length !== 0 ?
                    <AorReaList title="Reactions" service={service} isAction={false} setAorReaction={setReaction}></AorReaList>
                : null}
                </div>    
        </div>
  )
}

export default Service