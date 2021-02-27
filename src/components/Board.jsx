import React from 'react';
import Square from './Square';
import { setData, getData } from './../localStorageUtil';
import audioStep from '../assets/sounds/step.mp3';
import audioError from '../assets/sounds/error.mp3';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.save || {
      squares: Array(9).fill(null),
      xIsNext:true,
      mode:'pvp',
    }
    this.disableBoard = false;
    this.audioStep = new Audio(audioStep);
    this.audioError = new Audio(audioError);
    this.audioStep.volume = this.props.settings.volumeSound;
    this.audioError.volume = this.props.settings.volumeSound;
    this.timeForStep = +this.props.settings.timeForStep;
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.some((el)=>el === null) ? null : 'draw';
  }

  handleClickPVP(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      this.playAudio('error');
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.playAudio('step');
    this.setState({
      squares:squares,
      xIsNext:!this.state.xIsNext,
    });
  }

  playAudio(type) {
    if(this.props.settings.sound) {
      if(type==='step') {
        this.audioStep.currentTime = 0;
        this.audioStep.play();
      }
      else {
        this.audioError.currentTime = 0;
        this.audioError.play();
      }
    }
  }

  handleClickPVSPC(i) {
    const squares = this.state.squares.slice();
   
    if (this.calculateWinner(squares) || squares[i] || this.disableBoard) {
      this.playAudio('error');
      return;
    }
    squares[i] = 'X';
   
    this.disableBoard = true;
   
    this.playAudio('step');
    this.setState({
      squares:squares,
      xIsNext:!this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={()=>{
          if(this.state.mode === 'pvp') {
            this.handleClickPVP(i);
          }
          else {
            this.handleClickPVSPC(i);
          }
        }}
        colorFigure={this.props.settings.colorFigure}
        colorBoard={this.props.settings.colorBoard}/>
      );
  }

  changeMode(value) {
    this.disableBoard = false;
    this.autoWinner = null;
    this.winner = null;
    this.setState({
      squares: Array(9).fill(null),
      mode:value,
      xIsNext:true,
    });
  }

  resetGame() {
    this.disableBoard = false;
    this.autoWinner = null;
    this.winner = null;
    this.setState({
      squares: Array(9).fill(null),
      xIsNext:true,
    });
  }

  saveGame() {
    setData('saveGame',this.state);
  }

  componentDidUpdate() {
    if(!this.state.xIsNext && !this.calculateWinner(this.state.squares) && this.state.mode === 'pvspc') {
      this.computerStep();
    }
    clearTimeout(this.timer);
    if(!isNaN(this.timeForStep) && !this.winner){
      this.timer = setTimeout(() => {
        this.autoWinner = this.state.xIsNext ? 'O':'X';
        this.forceUpdate();
      }, +this.props.settings.timeForStep);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.stepPC);
  }

  computerStep() {
    const arrEmpty = [];
    const squares = this.state.squares.slice();

    squares.forEach((el,index)=>{
      if(!el) {
        arrEmpty.push(index);
      }
    });

    this.stepPC = setTimeout(()=>{
      squares[arrEmpty[Math.floor(Math.random() * arrEmpty.length)]] = 'O';
      this.playAudio('step');
      this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext,
      });
      this.disableBoard = false;
    }
    ,1000);
  }

  changeStatistics(mode,winner) {
    const statistics = getData('statisticsGame') || {
      pvp: {
        X:0,
        O:0,
        draw:0
      },
      pvspc:{
        X:0,
        O:0,
        draw:0
      }
    };
    statistics[mode][winner] += 1;
    setData('statisticsGame',statistics);
  }

  render() {
    this.winner = this.autoWinner || this.calculateWinner(this.state.squares);
    let status;
    if(this.winner) {
      if(this.winner === 'draw') {
        status = `Draw`;
      }
      else {
        status = `${this.winner} Wins`
      }
      this.changeStatistics(this.state.mode,this.winner);
    }
    else {
      status = `Next player: ${this.state.xIsNext ? 'X':'O'}`;
    }
    
    return (
      <div>
        <div className='choose-mode'>
          <label className='choose-mode-item'>
            <input type="radio" name='mode' value='pvp' defaultChecked={this.state.mode === 'pvp' ? true : false} onChange={(e)=>this.changeMode(e.target.value)}/>
            Player VS Player
          </label>
          <label className='choose-mode-item'>
            <input type="radio" name='mode' value='pvspc' defaultChecked={this.state.mode === 'pvp' ? false : true} onChange={(e)=>this.changeMode(e.target.value)}/>
           Player VS PC
          </label>
        </div>
        <div className="status">{status}</div>
      <div className="board-wrap">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div className={this.winner ? "board-result board-result--visible":"board-result"}>
            {status}
            <button className="board-result-btn" onClick={()=>this.resetGame()}>New Game</button>
          </div>
          </div>
       <div className='buttons-block'>
          <button className='button' onClick={()=>this.props.changeLink('menu')}>Menu</button>
          <button className='button' onClick={()=>this.saveGame()}>Save Game</button>
          <button className='button' onClick={()=>this.resetGame()}>Reset</button>
       </div>
      </div>
    );
  }
}

export default Board;