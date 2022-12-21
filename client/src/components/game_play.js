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
    const [board, setBoard] = useState(["","","","","","","","",""])
    const [boardTwo, setBoardTwo] = useState(["","","","","","","","",""])
    const [bttnText, setBttnText] = useState("Submit")
    const [Submit, isSubmitted] = useState(false)
    const [player, setPlayer] = useState("")
    const [moveDesc, setMoveDesc] = useState("")
    const [rivalID, setRivalID] = useState("")

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
    useEffect(()=>{
        console.log("Game start...");
        submitBttnRef.current.disabled = true
        let api = "https://async-tic-tac-toe.vercel.app/api/getGameDetails"
        let payload = {
            room
        }
        axios.get(api, {responseType: 'json',params:payload})
        .then((response) => {
            let gameData = response.data.gameData
            console.log("game details:",gameData);
            //this code Set your piece
            if(userID === gameData.playerX){
                setPlayer("X")
                setRivalID(gameData.playerO)
            }
            else{
                setPlayer("O")
                setRivalID(gameData.playerX)
            }
            setBoardTwo(gameData.boardArray)
            setBoard(gameData.boardArray)
            setPiece(gameData.turn)

            console.log("piece&player", piece,player);

        })
    },[piece,player])

    useEffect(()=>{
        if(player == piece){
            setMoveDesc("Your Move")
            setBttnText("Submit")
        }
        else{
            setMoveDesc("Their Move")
            setBttnText(`Waiting for ${rival}`) 
        }
    },[piece,player])


    useEffect(()=>{
        if(Submit === true){
            console.log("Checking winner");
            let winner = checkWin()
            console.log("Winner:",winner);
            console.log("Updating board in DB...");
            console.log("payload:", payload);
            setBoard(boardTwo);
            let api = "http://localhost:8081/api/updateBoard"
            let payload = {
                room,
                boardTwo,
                piece,
                winner
            }
            axios.post(api, payload)
            .then((response) => {   
                if(response.data.statusCode === 200){
                    setBttnText(`Waiting for ${rival}`)
                    submitBttnRef.current.disabled = true
                    console.log(response);
                }
            })
            isSubmitted(false)
        }
        // socket.emit("next-turn",board,piece,room)
    },[Submit])
    
    const changeTurn = () => {
        console.log("Piece before", piece);
        setPiece(piece=>piece==="X"?"O":"X"); 
        console.log("Piece now", piece);
    }

    function submitBoard(){
        console.log("Submitting board");
        console.log("Piece toggled");
        changeTurn()
        isSubmitted(true)
    }
    
    function checkWin(){
        console.log("Checking winner");
        const winningPattern = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[3,4,6]
        ]
        let winner = "";
        console.log(winningPattern.length);
        for (let i = 0; i < winningPattern.length; i++) {
            console.log("check",i,":",board[winningPattern[i][0]],board[winningPattern[i][1]],board[winningPattern[i][2]]);
            if(board[winningPattern[i][0]] === "X" && board[winningPattern[i][1]] === "X" && board[winningPattern[i][2]] === "X"){
                console.log("X win");
                winner = "X"
            }
            else if(board[winningPattern[i][0]] === "O" && board[winningPattern[i][1]] === "O" && board[winningPattern[i][2]] === "O"){
                console.log("O win");
                winner = "O"
            }
        }
        if(winner !== ""){
            if(winner === player){
                winner = userID
            }
            else{
                winner = rivalID
            }
        }
        return winner
    }
    
    function putPiece(index){   
        if(piece === player){
            console.log(`clicked on board with index ${index}`);
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
                    console.log("Enabled button");
                    submitBttnRef.current.disabled = false
            }   
            else{
                console.log("Disabled button");
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
                            {moveDesc}
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