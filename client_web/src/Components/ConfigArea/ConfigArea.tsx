// Extern modules
import React from 'react'

// My modules
import CAImageDescriptionArea from './CAImageDescriptionArea'
import CAParams from './CAParams'
import Request from '../Request'
import { goToPage, idContainerActionMoveable, idContainerReactionMoveable } from '../Utils'

// Styles
import styles from './styles/ConfigArea.module.css'


//Types

import type { Service, ActionReactionConfig } from '../../Types/Types'

type KeyValues = {
    [key: string]: any
};

type ConfigAreaProps = {
    activeService: Service,
    setActiveService: Function,
    action: ActionReactionConfig,
    setAction: Function,
    reaction: ActionReactionConfig,
    setReaction: Function
}


// Utils functions
function getParamsUserValues(params: any) {
    var newParams: KeyValues = {};
    var inputId: string;
    var inputElem;

    // Get the second value of [key: value]
    // This params are given by the server
    // The value is used to know the needed key params field for the action or reaction to create a new area
    // The key is used to know which type of input the user should use (string / number)
    for (const param of params) {
        if (param.number) {
            inputId = param.number
        } else if (param.string) {
            inputId = param.string
        } else {
            continue
        }
        // Get the Input Element for a given ID and read his value (filled by the user)
        inputElem = document.getElementById(inputId) as HTMLInputElement
        newParams[inputId] = param.number ? parseInt(inputElem.value) : inputElem.value
    }
    // return a 'by user' configured param
    return newParams
}


// Component
function ConfigArea(props: ConfigAreaProps) {
    // If there are no action / reaction selected, use the following informations to fill the config container
    let placeHolderUrl = "/areaPlaceHolder.png"
    let defaultActionTitle = "No action selected"
    let defaultReactionTitle = "No reaction selected"

    // Use state to actualize the components everytime a new action / reaction is selected
    const [actionParams, setActionParams] = React.useState([])
    const [reactionParams, setReactionParams] = React.useState([])
    const [errorCreating, setErrorCreating] = React.useState(undefined) as any

    React.useEffect(() => {
        // If an action is given, parse her params needed to create custom fields of action settings
        if (props.action?.params) {
            setActionParams(JSON.parse(props.action.params))
        } else {
            setActionParams([])
        }

        // If a reaction is given, parse her params needed to create custom fields of reaction settings
        if (props.reaction?.params) {
            setReactionParams(JSON.parse(props.reaction.params))
        } else {
            setReactionParams([])
        }

        // Parse params every time a new action / reaction is selected
    }, [props.action, props.reaction])

    // Call the server to create a new AREA with given action, reaction and parameters
    function createArea() {
        // Get params input fields values for action and reaction
        var action_params = getParamsUserValues(actionParams)
        var reaction_params = getParamsUserValues(reactionParams)

        // Check if action is defined
        if (!props?.action?.id) {
            setErrorCreating("Missing action")
            return
        }
        // Check if reaction is defined
        if (!props?.reaction?.id) {
            setErrorCreating("Missing reaction")
            return
        }
        // Call the api via the Request module
        Request.createArea({
            action_id: props.action.id,
            reaction_id: props.reaction.id,
            action_params: action_params,
            reaction_params: reaction_params
        }).then((res) => {
            console.log(res)
            goToPage('/profile')
        }).catch((err) => {
            console.log(err)
            setErrorCreating(err)
        })
    }
    return (
        <div>
            {/* Return button displayed only if on specific service page */}
            {props.activeService !== undefined ?
                <div className={styles.arrowContainer}>
                    <img onClick={() => {props.setActiveService(undefined)}} className={styles.arrow} src='arrow_left.png' alt='arrow_left.png'></img>
                    <img onClick={() => {createArea()}} className={`${styles.arrow} ${styles.arrowRight}`} src='arrow_left.png' alt='arrow_left.png'></img>
                </div>
            : null}

            <div className={`${styles.configContainer} ${props.activeService === undefined ? styles.noMinHeight : null}`}>

                {/* First container used to configure an Action */}
                <div className={styles.confAreaBox}>

                    {/* Container used to check hitbox for draggables actions + to unset action by clicking on it */}
                    <div id={idContainerActionMoveable} onClick={() => {props.setAction(undefined)}}>

                        {/* Container summarizing the reaction choosen */}
                        <CAImageDescriptionArea
                            description={props.action?.title ? props.action.title : defaultActionTitle}
                            imgUrl={props.action?.imgUrl ? props.action.imgUrl : placeHolderUrl}></CAImageDescriptionArea>
                    </div>

                    {/* Container of the params used to create the AREA */}
                    <CAParams params={actionParams}></CAParams>
                </div>

                {/* The add symbol at the middle */}
                <div className={styles.errorContainer}>
                    <img onClick={() => {createArea()}} className={styles.rouage} src='rouage.png' alt='rouage.png'></img>
                    {errorCreating !== undefined ?
                        <div className={styles.errorMessage}>{errorCreating}</div>
                    : null}
                    </div>

                {/* Second container used to configure a Reaction */}
                <div className={styles.confAreaBox}>

                    {/* Container used to check hitbox for draggables reactions + to unset reaaction by clicking on it */}
                    <div id={idContainerReactionMoveable} onClick={() => {props.setReaction(undefined)}}>

                        {/* Container summarizing the reaction choosen */}
                        <CAImageDescriptionArea
                            description={props.reaction?.title ? props.reaction.title : defaultReactionTitle}
                            imgUrl={props.reaction?.imgUrl ? props.reaction.imgUrl : placeHolderUrl}></CAImageDescriptionArea>
                    </div>
                
                    {/* Container of the params used to create the AREA */}
                    <CAParams params={reactionParams}></CAParams>
                </div>

            </div>
        </div>
    )
}

export default ConfigArea;