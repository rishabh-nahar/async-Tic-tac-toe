import React, { useState } from 'react'
import "../assets/css/form.css"
import back from "../assets/svg/back.svg"
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function userLogin(){
        let api = "https://async-tic-tac-toe.vercel.app/api/login"
        let payload = {
            username,
            password
        }
        axios.get(api, {responseType: 'json',params:payload})
        .then((response) => {
            // success and error message
            console.log(response);
            if (response.data.statusCode === 200) {
                setSuccessMessage("Logged In successfully")
                setErrorMessage("")
                localStorage.setItem("user",response.data.user)
                localStorage.setItem("userID",response.data.user_id)
                localStorage.setItem("email",response.data.email)
                window.location.href = "/home"
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
                        <Link to="/"><img src={back} alt="back" /></Link>
                    </div>
                    <div className='cred-text'>
                        <div className='text-1'>Login</div>
                        <div className='text-2'>Please enter your details</div>
                    </div>
                    <div className='form-conatiner'>
                        <form>
                            <div className='form-input'>
                                <label>Username</label>
                                <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='Type your username here' />
                            </div>
                            <div className='form-input'>
                                <label>Password</label>
                                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Type your password here' />
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
                        <button onClick={(e)=>{userLogin()}} className='bttn-1'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Login