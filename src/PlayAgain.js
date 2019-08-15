import React from 'react'

const PlayAgain = props => (
    <div className="game-done">
        <div
            className="message"
            style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
        >
            {props.gameStatus === 'lost' ? 'GameOver' : 'Nice'}
        </div>
        <button onClick={() => props.onClick()}>Play agin</button>
    </div>
);


export default PlayAgain