import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/home.css"
import axios from 'axios'
import GameCard from './gameCard'
import add from "../assets/svg/add.svg"

function Home() {
    const userID = localStorage.getItem("userID")
    const [textOnButton , setTextOnButton] = useState("Start game")
    const [games, setGames] = useState()
    const [gameFoundtext, setGameFoundtext] = useState("Loading...")
    
    useEffect(()=>{
            findGames()
            setInterval(()=>{
            findGames()
        },2500)
    },[])
    function findGames(){
        let api = "https://async-tic-tac-toe.vercel.app/api/findGames"  
        // let api = "http://localhost:8081/api/findGames" //
        let payload = {
            userID,
        }
        axios.get(api,{params:payload})
        .then(res=>{
            console.log(res);
            if(res.data.statusCode === 200){
                let allGameData = res.data.gameData;
                let test = []
                test = allGameData.map(function(val,index){
                    // console.log(Object.values(allGameData[index]));
                    return Object.values(allGameData[index])
                })
                console.log("Gamedata",typeof((allGameData)),">",allGameData,typeof(test));
                let noOfGames = test.length
                if(noOfGames > 0){
                    setGames(test)
                    console.log("Games Found");
                }
                else{
                    console.log("No Games");
                    setGameFoundtext("No Games Found")
                }
                }
                else{
                    setGameFoundtext("No Games Found")
                }
        })
    }

    function formatTimestamp(getTimestamp){

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

        let timeStampArray = getTimestamp.split("T")
        let time = timeStampArray[1].split(".")[0]
        let dateArray = timeStampArray[0].split("-")
        let year = dateArray[0];
        let month = monthNames[dateArray[1]-1]
        let day = dateArray[2]

        let newTimeStamp = day + " " + month + " " + year + ", " + time
        return (newTimeStamp)
    }

    function addGameCard(){
        let row = []
        for (let i = 0; i < games.length; i++) {
            row.push(<GameCard playername={games[i][0]} status={games[i][3]} board={games[i][4]}  turn={games[i][5]} timeStamp={formatTimestamp(games[i][6])}  gameSession={games[i][7]} key={games[i][7]} win={games[i][8]}  />)
        }
        return row
    }

    return (
        <>  
            <div className='home-body-wrapper'>
                <div className='home-body-container'>
                    <div className='your-game-text-container weight-bold'>
                        <div className='your-game-text'>Your Games</div>
                    </div>
                    <div className='all-games-container'>
                        {(games?
                           <>
                            {addGameCard()} 

                            <div className='new-game-bttn weight-bold'>
                                <Link  to="/start" className='link'><button className='bttn'>
                                    <img src={add}/> 
                                    <div>New Game</div>
                                    </button></Link>
                            </div>

                           </>
                            :
                            <>
                                <div className='games'>
                                    <div className='no-game-found cursive'>{gameFoundtext}</div>
                                </div>
                                <div className='button-container'>
                                    <Link  to="/start"><button className='bttn-1'>{textOnButton}</button></Link>
                                </div> 
                            </>
                            )}
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Home