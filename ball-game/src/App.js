import React, { Component } from 'react';
import Modal from './containers/Modal/Modal';
import './App.css';
import GameArea from './components/GameArea/GameArea';
import Header from './components/Header/Header';

class App extends Component {
  
  state = {
    showModal: false,
    firstBallClick:false,
    ballWidth: 0,
    ballHeight: 0,
    ballInfo: {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%,-50%)`,
      transition: "none"
    },
      gameWindow: {
      width: null,
      height: null
    },
    score: 0,
    bestScore: 0,
    time: 60,
    diffLvl:""
  };

  componentDidMount = () => {
    this.getWindowSize();
    document.querySelector(".btns button").click(); //selecting default game lvl (easy)
  };


  getWindowSize = () => {
    let windowSize = document.getElementById("area");
    const ball = document.getElementById("ball");
    let ballWidth = ball.offsetWidth;
    let ballHeight = ball.offsetHeight;
    this.setState({
      gameWindow: {width: windowSize.offsetWidth, height: windowSize.offsetHeight},
      ballWidth: ballWidth,
      ballHeight: ballHeight
    });
  }; // get window size, so that ball won't run off the screen

  showModal = () => {
    if(this.state.score > this.state.bestScore){  //update our bestScore if score > bestScore
      this.setState({
        showModal: !this.state.showModal,
        bestScore: this.state.score
      });
    }
    else{
      this.setState({showModal: !this.state.showModal});
    };
  };

  resetGame = () => {
    this.setState({
      showModal: false,
      score: 0,
      time: 60,
      isTimerOn: false,
      firstBallClick:false
    });
  };  //reseting key values in game

  setDifficulty = (diff) => {
    switch(diff){
      case("easy"):
        this.setState(
          {
          diffLvl:"easy",
          ballInfo: {
            top: `${50}%`,
            left: `${50}%`,
            transform: `translate(-50%,-50%)`,
            transition: `${1}s`
        }});
      break;

      case("medium"):
      this.setState({
        diffLvl:"medium",
        ballInfo: {
          top: `${50}%`,
          left: `${50}%`,
          transform: `translate(-50%,-50%)`,
          transition: `${0.5}s`
      }});
      break;

      case("hard"):
      this.setState({
        diffLvl:"hard",
        ballInfo: {
          top: `${50}%`,
          left: `${50}%`,
          transform: `translate(-50%,-50%)`,
          transition: "none"
      }});
      break;
      default: return;
    }
    this.resetGame();
  }; // setting game difficulty, diffrence is in transition

  btnClick = (e, difficulty) => {
    this.setDifficulty(difficulty);
    const btns = document.querySelectorAll(".btns button");
    btns.forEach(btn => {
      btn.classList.remove("clicked");
    });
    e.target.className = "clicked";
  };


  setBallPosition = () => {
    this.getWindowSize();
    this.setState({
      ballInfo: {
        ...this.state.ballInfo,
        left: `${Math.floor(Math.random() * (this.state.gameWindow.width - this.state.ballWidth))}px` , 
        top: `${Math.floor(Math.random() * (this.state.gameWindow.height - this.state.ballHeight))}px`,
        transform: `none`
      },
      score: this.state.score + 1,
      isTimerOn: true,
      firstBallClick: true
    });
  };

  setTimer = () => {
    if(this.state.isTimerOn){
      return;
    };
    const gameTime = setInterval( () => {
      if(this.state.time === 0){
        clearInterval(gameTime);
        this.showModal();
        return;
      }
      else if(!this.state.isTimerOn){
        clearInterval(gameTime);
      }
      else {
        this.setState({time: this.state.time - 1});
      }
    },1000);
  };

  startAgain = () => {
    if(this.state.score > this.state.bestScore){  //update our bestScore if score > bestScore
      this.setState({bestScore: this.state.score});
    };
    this.setDifficulty(this.state.diffLvl);
  };

  render = () => {
    return (
      <React.Fragment>
        <Modal
          again = {this.startAgain}
          show = {this.state.showModal} 
          score = {this.state.score}
          bestScore = {this.state.bestScore}>
        </Modal>
        <div className="wrapper">
          <Header
            easy = {(e) => this.btnClick(e,"easy")}
            medium = {(e) => this.btnClick(e,"medium")}
            hard = {(e) => this.btnClick(e,"hard")}
            start = {this.setTimer}
            time = {this.state.time}>
          </Header>
          <GameArea 
            ballClick = {() => {
              this.setTimer();
              this.setBallPosition();
            }}
            ballStyle = {this.state.ballInfo}></GameArea>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
