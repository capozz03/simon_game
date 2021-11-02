import React, { useState, useEffect } from 'react';
import './../App.css';

const DifficultLevels = ({ setDelay }) => {

    const [state, setState] = useState({level: "easy"});

    const changeDifficult = (e) => {
        setState({
            level: e.target.value
        })
        
    }

    useEffect(() => {
        if (state.level === "easy") {
            return setDelay(800) 
        }
        if (state.level === "medium") {
            return setDelay(500) 
        }
        if (state.level === "hard") {
            return setDelay(300) 
        }
        return setDelay(800)
    }, [setDelay, state.level])


    return (
        
        <form>
            <div className="radio-group">
                <input type="radio" 
                        id="option-one" 
                        name="game"
                        value="easy"
                        checked={state.level === "easy"}
                        onChange={changeDifficult}/>
                <label for="option-one">Easy</label>
                <input type="radio" 
                        id="option-two" 
                        name="game"
                        value="medium"
                        checked={state.level === "medium"}
                        onChange={changeDifficult}/>
                <label for="option-two">Medium</label>
                <input type="radio"
                        id="option-three" 
                        name="game"
                        value="hard"
                        checked={state.level === "hard"}
                        onChange={changeDifficult}/>
                <label for="option-three">Hard</label>
            </div>
        </form>
    );
};

export default DifficultLevels;