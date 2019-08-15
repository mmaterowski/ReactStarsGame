import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const PlayNumber = props => (
    <button
        className="number"
        style={{ backgroundColor: colors[props.status] }}
        onClick={() => props.onClick(props.number, props.status)}
    >
        {props.number}
    </button>
)

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

const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId =>
            <div key={starId} className="star" />)}
    </>
)
const Game = props => {
    const [stars, setStars] = React.useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = React.useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = React.useState([]);
    const [secondsLeft, setSecondsLeft] = React.useState(10);

    React.useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => { setSecondsLeft(secondsLeft - 1) }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active';

    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNums(utils.range(1, 9));
        setCandidateNums([]);
        setSecondsLeft(10);
    }
    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus == 'used') {
            return;
        }
        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);
        candidateNums.concat(number);
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        }
        else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n));
            setStars(utils.randomSumIn(newAvailableNums, 9))
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
        </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active'
                        ? (<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />)
                        : (<StarsDisplay count={stars} />)}
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            number={number}
                            status={numberStatus(number)}
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

const StarMatch = props => {
    const [gameId, setGameId] = React.useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
}

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

const utils = {
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    random: (min, max) => min + Math.floor(max * Math.random()),

    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length)];
    },
};

ReactDOM.render(<StarMatch />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
