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
    const [win, setWin] = useState()
    const [winner, setWinner] = useState()
    const [gameState, setGameState] = useState(true)
    const [getGameDetailsInterval, setGetGameDetailsInterval] = useState()

    const submitBttnRef = useRef()

    const userID = localStorage.getItem("userID")
    const room = localStorage.getItem("gameSessionID")
    const rival = localStorage.getItem("rival")

    useEffect(()=>{
        console.log("Getting game details");
        getGameDetails()
    },[])
    
    useEffect(()=>{
        let getGameDetilsTimeInterval;
        console.log("check win");
        if(piece !== player){
            getGameDetilsTimeInterval = setInterval(()=>{
                    getGameDetails()
                },1500)
            console.log("after piece changed... opponent turn");
            setMoveDesc("Their move")
            setBttnText(`Waiting for ${rival}`)  
            submitBttnRef.current.disabled = true;
        }else{
            setMoveDesc("Your move")
            setBttnText("Submit")
            submitBttnRef.current.disabled = false
        }
        return ()=>{clearInterval(getGameDetilsTimeInterval)}

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
      
            let boardArray = gameData.boardArray
            let intialBoardArray = [];
            boardArray.map((d,k)=>{
                return intialBoardArray.push(d)
            })
            setBoardTwo(intialBoardArray)
            setBoard(intialBoardArray)
            setPiece(gameData.turn)

            if(gameData.winner !== "" || gameData.winner !==null){
                console.log("Already winner:", gameData.winner);
                setWinner(gameData.winner)
                setWin(win)
            }
            console.log("piece and player", piece,player);
            }
        )
        console.log("You are:", player );
    }
    function putPiece(index){
        if(piece === player){
            checkWin()
            console.log("Winner:",winner);

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
        console.log("Saving results in db ...");
        let api =     "https://async-tic-tac-toe.vercel.app/api/updateBoard" // "http://localhost:8081/api/updateBoard" //
        let payload = {
            room,
            boardTwo,
            piece,
            winner
        }
        axios.post(api, payload)
        .then((response) => {   
            if(response.data.statusCode === 200){
                console.log("game update: ",response);
            }
        })
    }
   
    useEffect(()=>{
        console.log("winner state changed");
        if (winner) {
            setPiece(player)
            if(winner !== "T"){
                if(player === winner){
                    console.log("you win");
                    setWin("You win")
                }
                else{
                    console.log("they win");
                    setWin(rival+" Wins")
                }
            }
            else{
                console.log("It's a draw");
                setWin("It's a draw")
            }
            console.log("The Winner:", winner);
            console.log("Storing results in db ....");
            console.log(winner, gameState);

            let api =     "https://async-tic-tac-toe.vercel.app/api/updateBoard" // "http://localhost:8081/api/updateBoard" //
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
                    console.log("Sent winning result: ",response);
                }
            })
            setGameState(false)
        }
    },[winner])
    useEffect(()=>{
        setMoveDesc(win)
        setBttnText("Start new game")
        submitBttnRef.current.disabled = false;
        console.log("Game Completed");
    },[gameState])

    useEffect(()=>{
        console.log("Submit and stop");
        if(gameState === false && Submitted === true){
            window.location.href = "/start"
        }
    },[Submitted, gameState])

    function checkWin(){
        const winningPattern = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        let theWinner = false;
        for (let i = 0; i < winningPattern.length; i++) {
            console.log("check",i,":",board[winningPattern[i][0]],board[winningPattern[i][1]],board[winningPattern[i][2]]);
            if(board[winningPattern[i][0]] === "X" && board[winningPattern[i][1]] === "X" && board[winningPattern[i][2]] === "X"){
                setWinner("X")
                theWinner = true;
                console.log("X win");
                break;
            }
            else if(board[winningPattern[i][0]] === "O" && board[winningPattern[i][1]] === "O" && board[winningPattern[i][2]] === "O"){
                setWinner("O")
                theWinner = true
                console.log("O win");
                break;
            }
        }
        console.log("checkwin result:", theWinner);
        if(!theWinner){
            checkTie()
        }
    }
    function checkTie(){
        console.log("checking tie...");
        var tie = true
        for (let index = 0; index < board.length; index++) {
            console.log("Check if any piece",board[index]);
            if(board[index] !== "X" && board[index] !=="O"){
                console.log("Found blank piece at index",index);
                tie = false
                break;
            }
        }
        if(tie){
            setWinner("T")
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