import React from 'react'
import "./Input.css"

const input = props => {
    let inputElement = <input {...props.elementConfig} onChange={props.changed} value={props.value}/>

    return(
    <div className="Input">
        <label>{props.label}</label>
        {inputElement}
    </div>
    )
}

export default input