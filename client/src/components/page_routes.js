import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Entry from './entry'
import GamePlay from './game_play'
import Home from './home'
import Login from './login'
import Register from './register'
import StartGame from './start_game'


function PageRoutes() {
  return (
    <>

        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Entry />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/start' element={<StartGame />}/>
                <Route path='/game' element={<GamePlay />}/>

            </Routes>
        </BrowserRouter>
    
    </>
  )
}

export default PageRoutes