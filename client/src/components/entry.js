import React from 'react'
import '../assets/css/entry.css'
import { Link } from 'react-router-dom'

function Entry() {

    if(localStorage.getItem("user")){
        window.location.href = "/home"
    }

    return (
        <>
            <div className='body-wrapper'>
                <div className='body-container'>
                    <div className='info-container'>
                        <div className='game-text'>
                            <span className='text-1'>async</span>
                            <span className='text-2'>tic tac toe</span> 
                        </div>
                    </div>
                    <div className='cred-buttons'>
                        <button className='bttn-1'><Link className='link link-white' to="login" >Login</Link></button>
                        <button className='bttn-2'><Link className='link link-white' to="register" >Register</Link></button>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Entry