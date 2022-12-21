import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/home.css"
import axios from 'axios'
import GameCard from './gameCard'

function Home() {
    const userID = localStorage.getItem("userID")
    const [textOnButton , setTextOnButton] = useState("Start game")
    const [games, setGames] = useState()

    
    useEffect(()=>{
        let api = "https://async-tic-tac-toe.vercel.app/api/findGames"
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
                }
            }
        })
    },[])
    console.log(games);

    function formatTimestamp(getTimestamp){
        return (getTimestamp)
    }

    function addGameCard(){
        let row = []
        for (let i = 0; i < games.length; i++) {
            row.push(<GameCard playername={games[i][0]} status={games[i][3]} board={games[i][4]}  turn={games[i][5]} timeStamp={games[i][6]}  gameSession={games[i][7]} key={games[i][7]}  />)
        }
        return row
    }

    return (
        <>  
            <div className='home-body-wrapper'>
                <div className='home-body-container'>
                    <div className='your-game-text weight-bold'>
                        Your Games
                    </div>
                    <div className='all-games-container'>
                        {(games?
                           <>
                            {addGameCard()} 
                           </>
                            :
                            <>
                                <div className='games'>
                                    <div className='no-game-found cursive'>No Games Found</div>
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