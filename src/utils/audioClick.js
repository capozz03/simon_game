import blue from './../assets/blue.mp3';
import red from './../assets/red.mp3';
import yellow from './../assets/yellow.mp3';
import green from './../assets/green.mp3';

const audioBlue = new Audio(blue);
const audioRed = new Audio(red);
const audioYellow = new Audio(yellow);
const audioGreen = new Audio(green);

const audioClick = (color) => {
  if (color === "blue") {
    return audioBlue.play();
  }
  if (color === "red") {
    return audioRed.play()
  }
  if (color === "yellow") {
    return audioYellow.play()
  }
  if (color === "green") {
    return audioGreen.play()
  }
};

export default audioClick;