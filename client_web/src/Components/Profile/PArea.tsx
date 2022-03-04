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
    action: AreaCard,
    reaction: AreaCard
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

function BaseCard(props: AreaCard) {
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
    return (
        <div className={styles.card}>
            <div className={styles.subCard}>
                {BaseCard(props.action)}
                {Params(props.action.params)}
            </div>
            <img className={styles.separator} src="separator.png"></img>
            <div className={styles.subCard}>
                {BaseCard(props.reaction)}
                {Params(props.reaction.params)}
            </div>
        </div>
    )
}

function PArea() {
    const [areas, setAreas] = React.useState([])

    React.useEffect(() => {
        Request.getAreas().then((res) => {
            setAreas(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className={styles.areas}>
            <div className={styles.cardContainer}>
                {areas.map((elem: any, index: number) => {
                    return (
                        <CardArea key={index} action={elem?.action} reaction={elem?.reaction}></CardArea>
                    )
                })}
            </div>
        </div>
    )
}

export default PArea