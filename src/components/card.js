import React from "react"
import "./card.css"

export default function Card({ name, className, children }) {
    return (
        <div className={`card ${ className ? className : '' }`}>
            <h2 className='card-title'>{ name }</h2>
            <hr className='card-divider' />
            { children }
        </div>
    )
}