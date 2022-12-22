// import React from 'react'

// export default function getGameDetails() {
//     let api = "http://localhost:8081/api/getGameDetails" // https://async-tic-tac-toe.vercel.app/api/getGameDetails"
//     let payload = {
//         room
//     }
//     axios.get(api, {responseType: 'json',params:payload})
//     .then((response) => {
//         let gameData = response.data.gameData
//         console.log("game details:",gameData);
//         //this code Set your piece
//         if(userID === gameData.playerX){
//             setPlayer("X")
//             setRivalID(gameData.playerO)
//         }
//         else{
//             setPlayer("O")
//             setRivalID(gameData.playerX)
//         }
//         setBoardTwo(gameData.boardArray)
//         setBoard(gameData.boardArray)
//         setPiece(gameData.turn)

//         console.log("piece&player", piece,player);

//     }
// )}
   // function putPiece(index){   
    //     console.log(refreshBoardInterval);
    //     if(piece === player){
    //         console.log(`clicked on board with index ${index}`);
    //         if(boardTwo[index] === "" || boardTwo[index] === null){
    //             let newBoard = []
    //                 setBoardTwo(board)
    //                 board.map((c,i)=>{
    //                     if(index === i) {
    //                         newBoard[i] = piece
    //                     }
    //                     else{
    //                         newBoard[i] = board[i]
    //                     }
    //                 })
    //                 setBoardTwo(newBoard)
    //                 console.log("Enabled button");
    //                 submitBttnRef.current.disabled = false
    //                 checkWin()
    //         }   
    //         else{
    //             console.log("Disabled button");
    //             submitBttnRef.current.disabled = true
    //         }
    //     }
    // }

    // function checkWin(){
    //     console.log("Checking win");
    //     const winningPattern = [
    //         [0,1,2],[3,4,5],[6,7,8],
    //         [0,3,6],[1,4,7],[2,5,8],
    //         [0,4,8],[3,4,6]
    //     ]
    //     let winner = null;
    //     console.log(winningPattern.length);
    //     for (let i = 0; i < winningPattern.length; i++) {
    //         console.log("check",i,":",board[winningPattern[i][0]],board[winningPattern[i][1]],board[winningPattern[i][2]]);
    //         if(board[winningPattern[i][0]] === "X" && board[winningPattern[i][1]] === "X" && board[winningPattern[i][2]] === "X"){
    //             console.log("X win");
    //             winner = "X"
    //             break;
    //         }
    //         else if(board[winningPattern[i][0]] === "O" && board[winningPattern[i][1]] === "O" && board[winningPattern[i][2]] === "O"){
    //             console.log("O win");
    //             winner = "O"
    //             break;
    //         }
    //     }
    //     console.log("Winner:",winner);
    //     if(winner){
    //         setGameState(false)
    //         if(winner === player){
    //             winner = userID
    //             setWin(localStorage.getItem("name") + "win")
    //         }
    //         else{
    //             winner = rivalID
    //             setWin(rival + " win")
    //         }
    //         setMoveDesc(win)
    //         return winner
    //     }
    //     else{
    //         return checkTie()
    //     }
    // }

    // function checkTie(){
    //     let XCount = board.find( ()=>{ return "X"} ).length
    //     let OCount = board.find( ()=>{ return"O"} ).length
    //     let totalBlockUsed = XCount + OCount
    //     console.log("blockCount",(totalBlockUsed));
    //     if(totalBlockUsed === 9){
    //         setMoveDesc("It's a Draw")
    //         setWin(moveDesc)
    //     }
    // }

    // function submitBoard(){
    //     console.log("Submitting board");
    //     console.log("Piece toggled");
    //     changeTurn()
    //     console.log(piece);
    //     isSubmitted(true)
    //     submitBoardData()
    // }

    // function submitBoardData(){
    //     console.log("Checking winner");
    //     let winner = checkWin()
    //     console.log("Winner:",win);
    //     console.log("Updating board in DB...");
    //     setBoard(boardTwo);
        // let api = "http://localhost:8081/api/updateBoard"//"https://async-tic-tac-toe.vercel.app/api/updateBoard"
        // let payload = {
        //     room,
        //     boardTwo,
        //     piece,
        //     win
        // }
        // console.log("payload:", payload);
        // axios.post(api, payload)
        // .then((response) => {   
        //     if(response.data.statusCode === 200){
        //         setBttnText(`Waiting for ${rival}`)
        //         submitBttnRef.current.disabled = true
        //         console.log(response);
        //     }
        // })

    //     if(winner === userID){
    //         setMoveDesc(`You win`)
    //     }
    //     else{
    //         setMoveDesc(`${rival} wins`)
    //     }
    // }



    // socket.emit("create-connection",room)
    // socket.on("recieve-new-board",(newBoard, nextPiece,room)=>{
    //     setPiece(nextPiece)
    //     setBoardTwo(newBoard)
    //     setBoard(newBoard)
    // })

    // useEffect(()=>{
    //     console.log("Game start...");
    //     submitBttnRef.current.disabled = true
    //     let api = "https://async-tic-tac-toe.vercel.app/api/getGameDetails" // https://async-tic-tac-toe.vercel.app/api/getGameDetails"
    //     let payload = {
    //         room
    //     }
    //     axios.get(api, {responseType: 'json',params:payload})
    //     .then((response) => {
    //         let gameData = response.data.gameData
    //         console.log("game details:",gameData);
    //         //this code Set your piece
    //         if(userID === gameData.playerX){
    //             setPlayer("X")
    //             setRivalID(gameData.playerO)
    //         }
    //         else{
    //             setPlayer("O")
    //             setRivalID(gameData.playerX)
    //         }
    //         setBoardTwo(gameData.boardArray)
    //         setBoard(gameData.boardArray)
    //         setPiece(gameData.turn)
    //         // getMovesCount()
    //         console.log("piece & player", piece,player);
    //     })
    // },[])

   

    // function getMovesCount(){
    //     // console.log("board:",board.findIndex( ()=>{return ""} ))
    //     let gameTie = false
    //     for (let i = 0; i < board.length; i++) {
    //         if(board[i] === ""){
    //             gameTie = false
    //             break;
    //         }
    //         else{
    //             gameTie = true
    //         }
    //     }
    //     if(gameTie){
    //         setMoveDesc("It's a draw")
    //         setWin(moveDesc)
    //         setBttnText("Start new game")
    //         submitBttnRef.current.disabled = false;
    //         setGameState(false)
    //     }
    // }

    // useEffect(()=>{
    //     if(player !== piece){
    //         setMoveDesc("Their Move")
    //         setBttnText(`Waiting for ${rival}`) 
    //         // refreshBoardInterval = setInterval(()=>{
    //         //     getGameDetails()
    //         // },2000)
    //     }
    //     else{
    //         setMoveDesc("Your Move")
    //         setBttnText("Submit")
    //     }
    //     // return ()=>clearInterval(refreshBoardInterval)
    // },[piece,player])

    // useEffect(()=>{
    //     if(Submit === true && gameState === true){
    //         console.log("Checking winner");
    //         let winner = checkWin()
    //         console.log("Winner:",win);
    //         console.log("Updating board in DB...");
    //         setBoard(boardTwo);
    //         let api = "https://async-tic-tac-toe.vercel.app/api/updateBoard"
    //         let payload = {
    //             room,
    //             boardTwo,
    //             piece,
    //             win
    //         }
    //         console.log("payload:", payload);
    //         axios.post(api, payload)
    //         .then((response) => {   
    //             if(response.data.statusCode === 200){
    //                 setBttnText(`Waiting for ${rival}`)
    //                 submitBttnRef.current.disabled = true
    //                 console.log(response);
    //             }
    //         })

    //         if(winner === userID){
    //             setMoveDesc(`You win`)
    //         }
    //         else{
    //             setMoveDesc(`${rival} wins`)
    //         }
    //     }
    //     else if(gameState === false){
    //         // window.location.href = "/start"
    //         console.log(moveDesc);
    //     }
    //     getMovesCount()

    //     isSubmitted(false)
    //     // socket.emit("next-turn",board,piece,room)
    // },[Submit])