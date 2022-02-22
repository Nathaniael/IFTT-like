import React from 'react'
import HomeTree from "../HomeThree/HomeTree";
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div>
        <Link to="/login">
        <div className={styles.firstTitle}>
            <h1>THIS IS AREA</h1>
        </div>
        <HomeTree></HomeTree>
        </Link>
    </div>
  )
}

export default Home  