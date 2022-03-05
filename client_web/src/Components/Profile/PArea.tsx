import React from 'react'
import Request from '../Request'
import styles from './styles/PArea.module.css'

type ServiceCard = {
    name: string,
    logo: string
};

type AreaCard = {
    name: string,
    description: string,
    params: any,
    service: ServiceCard
}

type CardProps = {
    areaId: number,
    action: AreaCard,
    reaction: AreaCard,
    getAreas: Function
};

function Params(params: object) {
    for (const [key, value] of Object.entries(params)) {
        return (
            <div className={styles.params}>
                {
                    Object.entries(params).map(([key, value]: any, index: number) => {
                        return (
                            <div className={styles.paramsItem}>
                                <div>{key}</div>
                                <div>{value}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function BaseCard({...props}: AreaCard) {
    return (
        <div className={styles.cardHeader}>
            <img className={styles.cardImg} src={props.service.logo} alt="logo"></img>
            <div className={styles.titleContainer}>
                <div className={styles.serviceName}>{props.service.name}</div>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.description}>{props.description}</div>
            </div>
        </div>
    )
}

function CardArea(props: CardProps) {
    function deleteArea() {
        Request.deleteArea(props.areaId).then((res) => {
            props.getAreas()
        }).catch((err) => {
            console.log(err)
        })
        props.getAreas()
    }
    return (
        <div className={styles.card}>
            <img onClick={() => {deleteArea()}} className={styles.trashImg} src="trash.png" alt="trash.png"></img>
            <div className={styles.subCard}>
                <BaseCard {...props.action}></BaseCard>
                {Params(props.action.params)}
            </div>
            <img className={styles.separator} src="separator.png"></img>
            <div className={styles.subCard}>
                <BaseCard {...props.reaction}></BaseCard>
                {Params(props.reaction.params)}
            </div>
        </div>
    )
}

function PArea() {
    const [areas, setAreas] = React.useState([])

    function getAreas() {
        Request.getAreas().then((res) => {
            setAreas(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    React.useEffect(() => {
       getAreas()
    }, [])
    return (
        <div className={styles.areas}>
            <div className={styles.title}>Your registered Areas ({areas.length})</div>
            <div className={styles.cardContainer}>
                {areas.map((elem: any, index: number) => {
                    return (
                        <CardArea areaId={elem?.id} getAreas={getAreas} key={index} action={elem?.action} reaction={elem?.reaction}></CardArea>
                    )
                })}
            </div>
        </div>
    )
}

export default PArea