// Extern modules
import React from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

// My modules
import HomeTree from "../HomeThree/HomeTree";

// Styles
import styles from './styles/Home.module.css'


// Component
function Home() {
  const [cookies] = useCookies(['closeGetStarted'])

  return (
    <div>
        {/* Effect on click of the Home scene, go either to getStarted or services, depends on the user choice */}
        <Link to={cookies?.closeGetStarted ? "/services" : "/getStarted"}>
          {/* White layer with title located behind the HomeTree scene */}
          <div className={styles.firstTitle}>
              <h1>THIS IS AREA</h1>
          </div>
          {/* HomeThree scene opacity 0 that increase to 1 on hover to cover the previous layer */}
          <HomeTree></HomeTree>
        </Link>
    </div>
  )
}

export default Home  