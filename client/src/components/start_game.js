import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import back from "../assets/svg/back.svg"
import axios from 'axios'

function StartGame() {
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [email, setEmail] = useState("")
    const [userID, setuserID] = useState(localStorage.getItem("userID"))

    function findPlayer(){
        let api = "https://async-tic-tac-toe.vercel.app/api/findPlayer"
        let payload = {
            userID,
            email
        }
        axios.get(api, {responseType: 'json',params:payload})
        .then((response) => {   
            // success and error message
            console.log(response);
            if (response.data.statusCode === 200) {
                if(userID === response.data.user_id){
                    setErrorMessage("You cannot use your own email ID")
                    setSuccessMessage("")
                }
                else{
                    let playerX = userID;
                    let playerO = response.data.user_id
                    api = "https://async-tic-tac-toe.vercel.app/api/createGame" //"http://localhost:8081/api/createGame"
                    payload = {
                        playerX,
                        playerO,
                    }
                    axios.post(api,payload)
                    .then(res=>{
                        console.log(res.data);
                        if (res.data.statusCode === 200) {
                            setSuccessMessage("Playing with " + response.data.user)
                            setErrorMessage("")
                            localStorage.setItem("gameSessionID", res.data.game_id)
                            localStorage.setItem("rival", response.data.user)
                            window.location.href = "/game"
                        }
                    })
                }
            }
            else{
                setErrorMessage(response.data.message)
                setSuccessMessage("")
            }
          })
          .catch((error)=> {
            setErrorMessage(error)
            setSuccessMessage("")
          });
    }


    return (
        <>
        
        <div className='body-wrapper'>
                <div className='body-template'>
                    <div className='top'>
                        <div className='back-button'>
                            <Link to="/home"><img src={back} alt="back" /></Link>
                        </div>
                        <div className='cred-text'>
                            <div className='text-1'>Start a new game</div>
                            <div className='text-2'>Whom do you want to play with?</div>
                        </div>
                        <div className='form-conatiner'>
                            <form>
                                <div className='form-input'>
                                    <label>Email</label>
                                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Type your email here' />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='notification-alert'>
                            {(errorMessage ? <div className='error-message'>{errorMessage}</div>: "")}
                            {(successMessage ? <div className='success-message'>{successMessage}</div>: "")}
                        </div>
                        <div className='button-container'>
                            <button onClick={e=>findPlayer()} className='bttn-1'>Start game</button>
                        </div>
                    </div>
                </div>
            </div>

    </>
  )
}

export default StartGame