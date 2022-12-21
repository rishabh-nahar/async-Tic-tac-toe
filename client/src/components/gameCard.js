import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/game_card.css"
function GameCard(props) {
  return (
    <>
        <div className='game-card-wrapper'>
            <div className='game-card-container'>
                <div className='game-card-heading'><h2>Game with {props.playername}</h2></div>
                <div className='game-card-desc'>
                    <p className='prev-move'>{props.update}</p>
                    <p className='player-turn-info'>{props.status}</p>
                </div>
                <div className='time-stamp'>{props.timeStamp}</div>
                <Link>
                    <button className='bttn-1'>Play!</button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default GameCard