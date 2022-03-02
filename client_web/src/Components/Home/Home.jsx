import React from 'react'
import HomeTree from "../HomeThree/HomeTree";
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { useCookies } from 'react-cookie';

function Home() {
  const [cookies] = useCookies(['closeGetStarted'])

  return (
    <div>
        <Link to={cookies?.closeGetStarted ? "/services" : "/getStarted"}>
          <div className={styles.firstTitle}>
              <h1>THIS IS AREA</h1>
          </div>
          <HomeTree></HomeTree>
        </Link>
    </div>
  )
}

export default Home  