import React from 'react';
import './../App.css';


const SimonGame = ({flash, color, onClick}) => {

    return (
        <div onClick={onClick}
            className={`colorCard ${color} ${flash ? 'flash' : ''}`}></div>
    );
};

export default SimonGame;