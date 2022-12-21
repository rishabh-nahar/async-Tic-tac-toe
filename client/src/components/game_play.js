import React, { useEffect, useState } from 'react'
import "../assets/css/game.css"
import back from "../assets/svg/back.svg"
import { Link } from 'react-router-dom'
import axios from 'axios'
import X from "../assets/svg/x.svg" 
import O from "../assets/svg/o.svg" 
import io from "socket.io-client"
import SquareBlocks from './square_blocks'

const socket = io.connect("https://async-tic-tac-toe.vercel.app/")

function GamePlay() {
    const [piece, setPiece] = useState("X")
    const [currentPiece, setCurrentPiece] = useState(X)
    const [board, setBoard] = useState(["","","","","","","","",""])
    const [boardTwo, setBoardTwo] = useState(["","","","","","","","",""])
    const [bttnText, setBttnText] = useState("Submit")
    const [Submit, isSubmitted] = useState(false)


    const room = sessionStorage.getItem("gameSessionID")
    const rival = sessionStorage.getItem("rival")

    socket.emit("create-connection",room)
    socket.on("recieve-new-board",(newBoard, nextPiece,room)=>{
        setPiece(nextPiece)
        setBoardTwo(newBoard)
        setBoard(newBoard)
    })

    useEffect(()=>{
        let api = "https://async-tic-tac-toe.vercel.app/api/getGameDetails"
        let payload = {
            room
        }
        axios.get(api, {responseType: 'json',params:payload})
        .then((response) => {   
            // success and error message
            console.log(response);
            setBoard(response.data.gameData.boardArray)
        })
    },[])

    useEffect(()=>{
        setBoard(boardTwo);
        isSubmitted(false)
        setPiece(piece => "X" ? "O" : "X")
        sessionStorage.setItem("boardArray",board)
        socket.emit("next-turn",board,piece,room)
    },[Submit])

    console.log("Board",sessionStorage.getItem("boardArray"));

    function submitBoard(){
        isSubmitted(true)
    }

    function putPiece(index){   
        let newBoard = []
        setBoardTwo(board)
        board.map((c,i)=>{
            if(index === i) {
                newBoard[i] = piece
            }
            else{
                newBoard[i] = board[i]
            }
            setBoardTwo(newBoard)
        })

    }

    return (
    <>
        <div className='body-wrapper'>
            <div className='body-template'>
                <div className='top'>
                    <div className='back-button'>
                        <Link to="/start"><img src={back} alt="back" /></Link>
                    </div>
                    <div className='cred-text'>
                        <div className='text-2'>Game with {rival}</div>
                        <div className='text-1 weight-light'>Your piece</div>
                        <div className='piece'>
                            <img src={currentPiece} height="40" />
                        </div>
                    </div>
                    <div>
                        <div className='Move-desc'>
                            Your move
                        </div>
                        <div className='main-game-conatiner'>
                            <div onClick={e=>{putPiece(0)}} className='input-blocks border-top-none border-left-none r1-c1'>{boardTwo[0]}</div>
                            <div onClick={e=>{putPiece(1)}} className='input-blocks border-top-none r1-c2'>{boardTwo[1]}</div>
                            <div onClick={e=>{putPiece(2)}} className='input-blocks border-top-none border-right-none r1-c3'>{boardTwo[2]}</div>

                            <div onClick={e=>{putPiece(3)}} className='input-blocks border-left-none r2-c1'>{boardTwo[3]}</div>
                            <div onClick={e=>{putPiece(4)}} className='input-blocks r2-c2'>{boardTwo[4]}</div>
                            <div onClick={e=>{putPiece(5)}} className='input-blocks border-right-none r2-c3'>{boardTwo[5]}</div>

                            <div onClick={e=>{putPiece(6)}} className='input-blocks border-bottom-none border-left-none r3-c1'>{boardTwo[6]}</div>
                            <div onClick={e=>{putPiece(7)}} className='input-blocks border-bottom-none r3-c2'>{boardTwo[7]}</div>
                            <div onClick={e=>{putPiece(8)}} className='input-blocks border-bottom-none border-right-none r3-c3'>{boardTwo[8]}</div>

                        </div>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='button-container'>
                        <button onClick={e=>submitBoard()} className='bttn-1'>{bttnText}</button>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default GamePlay