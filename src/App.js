import React, { useEffect, useState} from 'react';
import SimonGame from './components/SimonGame';
import DifficultLevels from './components/DifficultLevels';
import './App.css';
import timeout from './utils/util';
import audioClick from './utils/audioClick';

const App = () => {

  const colorList = ["green", "red", "yellow", "blue"];

  const [isStart, setIsStart] = useState(false);

  const [delay, setDelay] = useState(800);

  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };
  
  const [play, setPlay] = useState(initPlay);

  const [flashColor, setFlashColor] = useState("");

  const startHandle = () => {
    setIsStart(true);
  }

  useEffect(() => {
    if (isStart) {
      setPlay({...initPlay, isDisplay: true})
    } else {
      setPlay(initPlay)
    }
  }, [isStart])

  useEffect(() => {
    if(isStart && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];
      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay(play => ({...play, colors: copyColors}));
    }
  }, [isStart, play.isDisplay])

  useEffect(() => {
    if (isStart && play.isDisplay && play.colors.length){
      displayColors();   
    }
  }, [isStart, play.isDisplay, play.colors.length])

  const displayColors = async () => {
    await timeout(delay);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      audioClick(play.colors[i]);
      await timeout(delay);
      setFlashColor("");
      await timeout(delay);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        return setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  };

  const gameClickHandle = async (color) => {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);
      audioClick(color);

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(delay);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(delay);
        setPlay({ ...initPlay, score: play.colors.length});
      }
      await timeout(200);
      setFlashColor("");
      await timeout(200);
    }
  }
  
  const closeHandle = () => {
    setIsStart(false)
  }

  return (
    <section className="main">
        <div className="game">
          <div className="game__wrapper">
            <div id="game__colors">
              {colorList.map(el => <SimonGame
                                     onClick={() => {
                                       gameClickHandle(el)
                                      }}
                                     flash={flashColor === el}
                                     audioClick={flashColor} 
                                     color={el} 
                                     />)} 
            </div>
            <div className="game__buttons">
              {!isStart && !play.score && (
                <>
                  <button className="start_button" onClick={startHandle}>
                    START
                  </button>
                </>
              )}
              {isStart && (play.isDisplay || play.userPlay) && (
                <div className="score">{play.score + 1}</div>
              )}
              {isStart && !play.isDisplay && !play.userPlay && play.score && (
                 <div className="final_score">
                   <h3>Final Score: {play.score}</h3>
                   <button className="newGame_button" onClick={closeHandle}>New Game</button>
                  </div> 
              )}
            </div>
            
          </div>
          {!isStart && !play.score && (
            <DifficultLevels setDelay={setDelay}/>
          )}
        </div>
    </section>
  );
};

export default App;