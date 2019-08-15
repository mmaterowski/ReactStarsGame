import React from 'react';

const StarMatch = () => {
    const stars = 5;
    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
        </div>
            <div className="body">
                <div className="left">
                    {utils.range(1, stars).map(starId =>
                        <div key={starId} className="star" />)}
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <button key={number} className="number">{number}</button>
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

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

export default StarMatch;