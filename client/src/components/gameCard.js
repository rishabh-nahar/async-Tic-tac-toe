import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/game_card.css"
function GameCard(props) {

    function playGame(){
        sessionStorage.setItem("gameSessionID", props.gameSession)
        sessionStorage.setItem("rival", props.playername)
        sessionStorage.setItem("boardArray", props.board)
        window.location.href = "/game"
    }
    
    return (
        <>
            <div className='game-card-wrapper'>
                <div className='game-card-container'>
                    <div className='game-card-heading'><h2>Game with {props.playername}</h2></div>
                    <div className='game-card-desc'>
                        <p className='player-turn-info'>{props.status}</p>
                        <p className='prev-move'>{props.turn}</p>
                    </div>
                    <div className='time-stamp'>{props.timeStamp}</div>
                    <Link>
                        <button onClick={e=>{playGame()}} className='bttn-1'>Play!</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default GameCard