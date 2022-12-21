import React, { useState } from 'react'
import "../assets/css/game.css"


function SquareBlocks(props) {    

    return (
        <>
            {/* <div className='input-blocks border-top-none border-left-none'>{props.piece}</div> */}
            <div onClick={e=>{props.onClickPiece()}} className={props.classnameList}>{props.piece}</div>
        </>
        // <div onClick={e=>{props.onClickPiece()}} className={props.classnameList}>{props.board}</div>
    )
}

export default SquareBlocks