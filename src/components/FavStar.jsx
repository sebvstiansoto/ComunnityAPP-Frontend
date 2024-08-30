import React from 'react'
import EmptyStar from '../assets/star2.png'
import FilledStar from '../assets/star.png'

export function FavStar ({isActive, activate}) {
return (
    <button onClick= {activate}>
        {
            isActive ? (
                <img width= "20px" height= "20px" src={FilledStar} alt="" />
            ) : (
                <img width= "20px" height= "20px"  src={EmptyStar} alt="" />
            )
        }
        <img src="./star.png" alt="" />
    </button>
)
}