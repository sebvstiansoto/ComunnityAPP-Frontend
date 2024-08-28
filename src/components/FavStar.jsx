import React from 'react'
import EmptyStar from './star2.png'
import FilledStar from './star.png'

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