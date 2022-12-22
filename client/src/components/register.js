import React, { useState } from 'react'
import "../assets/css/form.css"
import back from "../assets/svg/back.svg"
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Function to send payload to database
    function regDetails(){
        let url = "https://async-tic-tac-toe.vercel.app/api/register"
        let payload = {
            name,
            username,
            email,
            password
        }
        axios.post(url, payload)
        .then((response) => {
            // success and error message
            console.log(response);
            if (response.data.statusCode === 200) {
                setSuccessMessage("Congartulations!!! Account created")
                setErrorMessage("")
                localStorage.setItem("user",response.data.user)
                localStorage.setItem("name",response.data.user)
                localStorage.setItem("userID",response.data.user_id)
                localStorage.setItem("email",response.data.email)
                window.location.href = "/"
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
                            <div className='text-1'>Create account</div>
                            <div className='text-2'>Lets get to know you better!</div>
                        </div>
                        <div className='form-conatiner'>
                            <form>
                                <div className='form-input'>
                                    <label>Your name</label>
                                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Type your name here' />
                                </div>
                                <div className='form-input'>
                                    <label>Username</label>
                                    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='Type your username here' />
                                </div>
                                <div className='form-input'>
                                    <label>Email</label>
                                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Type your email here' />
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
                            <button onClick={(e)=>{regDetails()}} className='bttn-1'>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default Register