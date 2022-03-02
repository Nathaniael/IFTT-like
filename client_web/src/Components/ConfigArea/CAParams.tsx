// Extern modules
import React from 'react'


// Styles
import styles from './styles/CAParams.module.css'


// Types
type Props = {
    params: any
};


// Component
function CAParams(props: any) {
    return (
        <div>
            {props.params?.map((elem: any, index: number) => {
                return (
                    <div key={index}>
                        {elem?.number ?
                            <input type="text" placeholder={elem.number} id={elem.number}></input>
                            : null
                        }    
                        {elem?.string ?
                            <input type="text" placeholder={elem.string} id={elem.string}></input>
                            : null
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default CAParams;