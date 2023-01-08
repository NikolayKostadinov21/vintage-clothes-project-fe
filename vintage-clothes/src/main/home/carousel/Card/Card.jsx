import React from 'react'
import './Card.scss'
const Card = (props) => {
    return (
        <div className='mycard'>Mycard No. {props.cardno}</div>
    )
}

export default Card