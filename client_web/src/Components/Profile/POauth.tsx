import React from 'react'
import styles from './styles/PServices.module.css'
import GitLabAuthWidget from '../OAuth/GitLabAuthWidget'
import { useCookies } from 'react-cookie'

function POauth() {
    const [gitlab, setGitlab] = React.useState(false)
    const [cookies] = useCookies(['gitlab_token'])

    React.useEffect(() => {
        console.log(cookies.gitlab_token)
    }, [cookies.gitlab_token])
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img className={`${styles.img} ${cookies?.gitlab_token ? styles.imgFullOpacity : null}`} src='/gitlab.png' alt='/gitlab.png'></img>
                {cookies?.gitlab_token ?
                    <img className={styles.imgHover} src='/validate.png' alt='/validate.png' onClick={() => {setGitlab(true)}}></img>
                    :
                    <img className={styles.imgHover} src='/cross.png' alt='/cross.png' onClick={() => {setGitlab(true)}}></img>}
                </div>
            {gitlab ?
                <GitLabAuthWidget></GitLabAuthWidget>
            : null}
        </div>
    )
}

export default POauth