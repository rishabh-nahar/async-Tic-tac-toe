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
    const [Submitted, isSubmitted] = useState(false)
    const [player, setPlayer] = useState("")
    const [moveDesc, setMoveDesc] = useState("")
    const [rivalID, setRivalID] = useState("")
    const [win, setWin] = useState("")
    const [winner, setWinner] = useState("")
    const [gameState, setGameState] = useState(true)

    const submitBttnRef = useRef()

    const userID = localStorage.getItem("userID")
    const room = localStorage.getItem("gameSessionID")
    const rival = localStorage.getItem("rival")

    let refreshBoardInterval;

    //getGameDetails()
    //putPiece
    //checkwin
    //submitBoard

    useEffect(()=>{
        console.log("Getting game details");
        getGameDetails()
    },[])
    
    useEffect(()=>{
        console.log("check win");
        checkWin()
        if(piece !== player){
            refreshBoardInterval = setInterval(()=>{
                getGameDetails()
            },2000)
            console.log("after piece changed... opponent turn");
            setMoveDesc("Their move")
            submitBttnRef.current.disabled = true
            setBttnText(`Waiting for ${rival}`)  
        }else{
            setMoveDesc("Your move")
            submitBttnRef.current.disabled = false
            setBttnText("Submit")
        }
        return ()=>{clearInterval(refreshBoardInterval)}
    },[piece, player])
    function getGameDetails(){
        let gameData;
        let api =  "https://async-tic-tac-toe.vercel.app/api/getGameDetails" // "http://localhost:8081/api/getGameDetails"
        let payload = {
            room
        }
        axios.get(api, {responseType: 'json',params:payload})
        .then((response) => {
            gameData = response.data.gameData
            console.log("game details:",gameData);
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
            console.log("piece and player", piece,player);
            }
        )
        console.log("You are:", player );
        return gameData
    }
    function putPiece(index){
        if(piece === player){
            checkWin()
            console.log(`clicked on board with index ${index}`);
            if(boardTwo[index] === "" || boardTwo[index] === null){
                let newBoard = []
                newBoard = board.map((c,i)=>{
                    if(index === i) {
                        return piece
                    }
                    else{
                        return board[i]
                    }
                })
                setBoardTwo(newBoard)
            }
            console.log("Piece inserted");
        }
        else{
            console.log("Waiting for opponent");
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
    function submitBoard(){
            console.log("winner",winner);
            console.log("Submitting data");
            console.log("Piece before", piece);
            setPiece(currentPiece=>currentPiece==="X"?"O":"X"); 
            console.log("Piece now", piece);
            isSubmitted(true)
    }
    
    useEffect(()=>{
        if(Submitted === true){
            sendBoarddataToServer();
            isSubmitted(false)
        }
    },[Submitted])
    function sendBoarddataToServer(){
        let api =    "https://async-tic-tac-toe.vercel.app/api/updateBoard" // "http://localhost:8081/api/updateBoard" //
        let payload = {
            room,
            boardTwo,
            piece,
            winner
        }
        console.log("payload:", payload);
        axios.post(api, payload)
        .then((response) => {   
            if(response.data.statusCode === 200){
                console.log("game update: ",response);
            }
        })
    }
    function checkWin(){
        console.log("Checking win");
        const winningPattern = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[3,4,6]
        ];
        for (let i = 0; i < winningPattern.length; i++) {
            console.log("check",i,":",board[winningPattern[i][0]],board[winningPattern[i][1]],board[winningPattern[i][2]]);
            if(board[winningPattern[i][0]] === "X" && board[winningPattern[i][1]] === "X" && board[winningPattern[i][2]] === "X"){
                console.log("X win");
                setWinner("X")
                break;
            }
            else if(board[winningPattern[i][0]] === "O" && board[winningPattern[i][1]] === "O" && board[winningPattern[i][2]] === "O"){
                console.log("O win");
                setWinner("O")
                break;
            }
        }
    }
    useEffect(()=>{
        if(player === piece){
            setMoveDesc("You win")
            setWin(localStorage.getItem("name"))
        }
        else{
            setMoveDesc(rival+" wins")
            setWin(rival)
        }
        setBttnText("Start new game")
        submitBttnRef.current.disabled = false;
        setGameState(false)
    },[winner])

    function checkTie(){
        console.log("checking tie");
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