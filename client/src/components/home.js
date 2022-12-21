import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/home.css"
import axios from 'axios'
import GameCard from './gameCard'

function Home() {
    const userID = sessionStorage.getItem("userID")
    const [textOnButton , setTextOnButton] = useState("Start game")
    const [games, setGames] = useState({})

    
    useEffect(()=>{
        let api = "http://localhost:8081/api/findGames"
        let payload = {
            userID,
        }
        axios.get(api,{params:payload})
        .then(res=>{
            console.log(res);
            let noOfGames = Object.keys(res.data.gameData).length
            console.log(noOfGames);
            if(noOfGames > 0){
                console.log("game Found");
                setGames(res.data.gameData)
                console.log(games);
            }
            else{
                console.log("No Games");
            }
        })
    },[])

    function formatTimestamp(getTimestamp){
        function toTimestamp(strDate){
            var datum = Date.parse(strDate);
            return datum/1000;
         }
        return (getTimestamp)
    }

    function addGameCard(){
        let row = []
        for (let i = 0; i < games.length; i++) {
            row.push(<GameCard key={games[i]._doc._id} playername={games[i].rival} update="" status={games[i]._doc.status} timeStamp={formatTimestamp(games[i].timeStamp)} />)
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
                        {(games.length > 0?
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