import React, { useEffect, useState, useRef } from 'react'
import "../assets/css/game.css"
import back from "../assets/svg/back.svg"
import { Link } from 'react-router-dom'
import axios from 'axios'
import X from "../assets/svg/x.svg" 
import O from "../assets/svg/o.svg" 
import io from "socket.io-client"
import SquareBlocks from './square_blocks'

// const socket = io.connect("https://async-tic-tac-toe.vercel.app/")

function GamePlay() {
    const [piece, setPiece] = useState("X")
    const [pieceImgSrc, setPieceImgSrc] = useState(X)
    const [board, setBoard] = useState(["","","","","","","","",""])
    const [boardTwo, setBoardTwo] = useState(["","","","","","","","",""])
    const [bttnText, setBttnText] = useState("Submit")
    const [Submit, isSubmitted] = useState(false)
    const [player, setPlayer] = useState("")

    const submitBttnRef = useRef()

    const userID = sessionStorage.getItem("userID")
    const room = sessionStorage.getItem("gameSessionID")
    const rival = sessionStorage.getItem("rival")

    // socket.emit("create-connection",room)
    // socket.on("recieve-new-board",(newBoard, nextPiece,room)=>{
    //     setPiece(nextPiece)
    //     setBoardTwo(newBoard)
    //     setBoard(newBoard)
    // })
    const changeTurn = () => {setPiece(piece=>piece===("X"?"O":(piece ==="O"?"X":"O"))); return piece}
    useEffect(()=>{
        submitBttnRef.current.disabled = true
        let api = "https://async-tic-tac-toe.vercel.app/api/getGameDetails"
        let payload = {
            room
        }
        axios.get(api, {responseType: 'json',params:payload})
        .then((response) => {
            let gameData = response.data.gameData
            console.log(gameData);
            //this code Set your piece
            if(userID === gameData.playerX){
                setPlayer("X")
            }
            else{
                setPlayer("O")
            }
            setBoardTwo(gameData.boardArray)
            setBoard(gameData.boardArray)
            setPiece(gameData.turn)

            console.log("piece&player", piece,player);

        })
        
    },[])
    useEffect(()=>{
        if(player === piece){
            setBttnText("Submit")
        }
        else{
            setBttnText(`Waiting for ${rival}`) 
        }
    },[piece,player])

    useEffect(()=>{
        setBoard(boardTwo);
        isSubmitted(false)
        // setPiece(piece => "X" ? "O" : "X")
        // socket.emit("next-turn",board,piece,room)
    },[Submit])


    function submitBoard(){
        console.log("piece changed",changeTurn())
        let api = "https://async-tic-tac-toe.vercel.app/api/updateBoard"
        let payload = {
            room,
            boardTwo,
            piece
        }
        axios.post(api, payload)
        .then((response) => {   
            console.log(response);
            if(response.data.statusCode === 200){
                setBttnText(`Waiting for ${rival}`)
                submitBttnRef.current.disabled = true
            }
        })
        isSubmitted(true)
    }
    
    function putPiece(index){   
        if(piece === player){
            if(boardTwo[index] === "" || boardTwo[index] === null){
                let newBoard = []
                    setBoardTwo(board)
                    board.map((c,i)=>{
                        if(index === i) {
                            newBoard[i] = piece
                        }
                        else{
                            newBoard[i] = board[i]
                        }
                    })
                    setBoardTwo(newBoard)
                    submitBttnRef.current.disabled = false
            }   
            else{
                submitBttnRef.current.disabled = true
            }
        }


    }

    function displayPiece(boardPiece){
        if(boardPiece === "X"){
            return <img src={X} />
        }
        else if(boardPiece === "O"){
            return <img src={O} />
        }
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
                            {displayPiece(player)}
                        </div>
                    </div>
                    <div>
                        <div className='Move-desc'>
                            Your move
                        </div>
                        <div className='main-game-conatiner'>
                            <div onClick={e=>{putPiece(0)}} className='input-blocks border-top-none border-left-none r1-c1'>{displayPiece(boardTwo[0])}</div>
                            <div onClick={e=>{putPiece(1)}} className='input-blocks border-top-none r1-c2'>{displayPiece(boardTwo[1])}</div>
                            <div onClick={e=>{putPiece(2)}} className='input-blocks border-top-none border-right-none r1-c3'>{displayPiece(boardTwo[2])}</div>

                            <div onClick={e=>{putPiece(3)}} className='input-blocks border-left-none r2-c1'>{displayPiece(boardTwo[3])}</div>
                            <div onClick={e=>{putPiece(4)}} className='input-blocks r2-c2'>{displayPiece(boardTwo[4])}</div>
                            <div onClick={e=>{putPiece(5)}} className='input-blocks border-right-none r2-c3'>{displayPiece(boardTwo[5])}</div>

                            <div onClick={e=>{putPiece(6)}} className='input-blocks border-bottom-none border-left-none r3-c1'>{displayPiece(boardTwo[6])}</div>
                            <div onClick={e=>{putPiece(7)}} className='input-blocks border-bottom-none r3-c2'>{displayPiece(boardTwo[7])}</div>
                            <div onClick={e=>{putPiece(8)}} className='input-blocks border-bottom-none border-right-none r3-c3'>{displayPiece(boardTwo[8])}</div>

                        </div>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='button-container'>
                        <button ref={submitBttnRef} onClick={(e)=>submitBoard()} className='submit-bttn bttn-1'>{bttnText}</button>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default GamePlay