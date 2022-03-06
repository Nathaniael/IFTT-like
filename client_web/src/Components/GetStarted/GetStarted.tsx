// Extern modules
import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

// My modules
import AppBar from '../AppBar/AppBar'
import { goToPage } from '../Utils'

// Styles
import styles from './styles/GetStarted.module.css'


// Types

function ImageContainer() {
  return (
    <div>ImageContainer</div>
  )
}


// Component
function GetStarted() {
    const [cookies, setCookies, removeCookies] = useCookies(['closeGetStarted'])

    function closeIt() {
        setCookies('closeGetStarted', true);
        goToPage("/services")
    }

    function enableIt() {
        removeCookies('closeGetStarted')
        goToPage("/getStarted")
    }

    return (
        <div className="background">
            <AppBar></AppBar>
            <div className={styles.getStartedPage}>
                <div className={styles.summary}>
                    <div>GET STARTED</div>
                    <a href="#step1">1. About the connexion</a>
                    <a href="#step2">2. My profile</a>
                    <a href="#step3">3. Oauth access</a>
                    <a href="#step4">4. The services</a>
                    <a href="#step5">5. Configure an area</a>
                    <a href="#step6">6. My areas</a>
                </div>
                <br/><br/><br/><br/><br/>
                <div id="step1" className={styles.row}>
                    <div className={styles.hints}>
                        <Link to="/login">
                            <button className={styles.button}>CONNEXION</button>
                        </Link>
                        <div>1. You can register with the form</div>
                        <br/>
                        <div>2. You can use Google Oauth login</div>
                    </div>
                    <div className={styles.imgContainer}>
                        <div className={styles.stepTitle}>1. About the connexion</div>
                        <Link to="/login">
                            <img className={styles.img} src="started/step_01.png"></img>
                        </Link>
                    </div>
                </div>
                <img className={styles.zigzag} src="started/zigzag_left.png"></img>
                <div id="step2" className={styles.row}>
                <div className={styles.imgContainer}>
                        <div className={styles.stepTitle}>2. My profile</div>
                        <Link to="/profile">
                            <img className={styles.img} src="started/step_02.png"></img>
                        </Link>
                    </div>
                    <div className={styles.hints}>
                        <Link to="/profile">
                            <button className={styles.button}>PROFILE</button>
                        </Link>
                        <div>1. Here is your profile, you can change your username by clicking on it. You can also delete your account at the bottom.</div>
                        <br/>
                        <div>2. Click here to access to the grant the Oauth access to services</div>
                    </div>
                </div>
                <img className={styles.zigzag} src="started/zigzag_right.png"></img>
                <div id="step3" className={styles.row}>
                    <div className={styles.hints}>
                        <Link to="/profile">
                            <button className={styles.button}>PROFILE</button>
                        </Link>
                        <div>1. Click on the logo and accept Gitlab access</div>
                        <br/>
                        <div>2. The page reloads and confirms your action</div>
                    </div>
                    <div className={styles.imgContainer}>
                        <div className={styles.stepTitle}>3. Oauth access</div>
                        <Link to="/profile">
                            <img className={styles.img} src="started/step_03.png"></img>
                        </Link>
                    </div>
                </div>
                <img className={styles.zigzag} src="started/zigzag_left.png"></img>
                <div id="step4" className={styles.row}>
                    <div className={styles.imgContainer}>
                        <div className={styles.stepTitle}>4. The services</div>
                        <Link to="/services">
                            <img className={styles.img} src="started/step_04.png"></img>
                        </Link>
                    </div>
                    <div className={styles.hints}>
                        <Link to="/services">
                            <button className={styles.button}>SERVICES</button>
                        </Link>
                        <div>1. Here you can see your actual selected Action and Reaction</div>
                        <br/>
                        <div>2. Click here to access to the availables Actions and Reactions of a Service</div>
                    </div>
                </div>
                <img className={styles.zigzag} src="started/zigzag_right.png"></img>
                <div id="step5" className={styles.row}>
                    <div className={styles.hints}>
                        <Link to="/services">
                            <button className={styles.button}>SERVICES</button>
                        </Link>
                        <div>1. You can drag Actions and Reactions on the top to configure them</div>
                        <br/>
                        <div>2. Fill all the required fields and click on the top right corner to create the Area</div>
                    </div>
                    <div className={styles.imgContainer}>
                        <div className={styles.stepTitle}>5. Configure an area</div>
                        <Link to="/services">
                            <img className={styles.img} src="started/step_05.png"></img>
                        </Link>
                    </div>
                    </div>
                <img className={styles.zigzag} src="started/zigzag_left.png"></img>
                <div id="step6" className={styles.row}>
                    <div className={styles.imgContainer}>
                        <div className={styles.stepTitle}>6. My areas</div>
                        <Link to="/profile">
                            <img className={styles.img} src="started/step_06.png"></img>
                        </Link>
                    </div>
                    <div className={styles.hints}>
                        <Link to="/profile">
                            <button className={styles.button}>PROFILE</button>
                        </Link>
                        <div>1. You can see the active Areas you created</div>
                        <br/>
                        <div>2. You can also delete unwanted Areas</div>
                    </div>
                </div>
                <a href='https://picsum.photos/1080/720' target='_blank'>
                    <button className={styles.button}>Start your day in a better mood</button>
                </a>
                {/* {cookies?.closeGetStarted ?
                        <button onClick={() => {enableIt()}}>Enable it again ! ✅</button>
                    :   <button onClick={() => {closeIt()}}>Don't show this again ❌</button>
                }
                <div className={styles.title}>STEP ONE : Create an account / login to your account</div>
                <Link to="/login">
                    <button className={styles.button}>GO LOGIN</button>
                </Link>
                <div className={styles.title}>STEP TWO : Got to your profile and grant access to the oauth services used by our app</div>
                <Link to="/profile">
                    <button className={styles.button}>GO PROFILE</button>
                </Link>
                <div className={styles.title}>STEP THREE : Go to services and select a service you want to use</div>
                <div className={styles.title}>STEP FOUR : Select an action from the service</div>
                <div className={styles.title}>STEP FIVE : Select a reaction from the service or from another service</div>
                <Link to="/services">
                    <button className={styles.button}>GO SERVICES</button>
                </Link> */}
            </div>
        </div>
    )
}

export default GetStarted