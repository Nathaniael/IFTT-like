import React from 'react'
import styles from './ChooseService.module.css'
import { Link } from 'react-router-dom'
import AppBar from "../AppBar/AppBar";
import ConfigArea from '../ConfigArea/ConfigArea';
import Request from '../Request';
import { useCookies } from 'react-cookie';

function SubDescription({ title, list }) {
    return (
        <div className={styles.subDescription}>
            {list.length === 0 ? null : 
                <div className={styles.littleTitle}>
                    {title}
                </div>
            }
            
            <div>
            {list?.map((elem, index) => {
                return (
                    <div key={index} className={styles.littleElem}>
                        <div className={styles.littleElemTitle}>{elem.name}</div>
                        <div className={styles.littleElemDescription}>{elem.description}</div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

function DescriptionWidget({ hidden, onLeft, name, actions, reactions }) {
    return (
        <div className={`${styles.descriptionService} ${hidden ? styles.hidden : null} ${onLeft ? styles.descriptionLeft : styles.descriptionRight}`}>
            <div className={styles.serviceTitle}>{name}</div>
            <SubDescription title="Actions" list={actions}></SubDescription>
            <SubDescription title="Reactions" list={reactions}></SubDescription>
        </div>
    )
}

function ServiceWidget({ service, onLeft }) {
    const [hover, setHover] = React.useState(false)

    return (
        <div>
            <DescriptionWidget hidden={!hover} onLeft={onLeft} name={service?.name} actions={service?.actions} reactions={service?.reactions}></DescriptionWidget>
            <Link to={`/services/${service.id}`} state={{service: service}}>
            <img onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.logo} alt={service?.logo}></img>
            </Link>  
        </div>
    )
}

function ChooseService() {
    const [listServices, setListServices] = React.useState([])
    const [cookies] = useCookies()

    React.useEffect(() => {
        Request.getServices().then((res) => {
            setListServices(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className={styles.servicePage}>
            <AppBar></AppBar>
            <ConfigArea></ConfigArea>
            <div className={styles.servicePageBody}>
                <div className={styles.titlePage}>Services</div>
                {cookies?.logged ?
                    <div className={styles.listServices}>
                        {listServices?.map((elem, index) => {
                            return (
                                <ServiceWidget key={elem?.id} service={elem} onLeft={index % 2 === 0 ? true : false}></ServiceWidget>
                            )
                        })}
                    </div>
                    : <Link to="/login">LOG TOI</Link>
                }
            </div>
        </div>
    )
}

export default ChooseService