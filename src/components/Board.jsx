import React from 'react';
import Square from './Square';
import { setData, getData } from './../localStorageUtil';
import audioStep from '../assets/sounds/step.mp3';
import audioError from '../assets/sounds/error.mp3';
import { DEFAULT_STATISTICS, WIN_COMBINATION } from '../DefaultValues'

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
    const lines = WIN_COMBINATION.slice();
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
          else  if(this.state.mode === 'pvspc'){
            this.handleClickPVSPC(i);
          }
          else {
            this.playAudio('error');
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
    if(!this.calculateWinner(this.state.squares) && this.state.mode === 'pcvpc') {
      this.disableBoard = true;
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
    const lines = WIN_COMBINATION.slice();
    let step;
    const findX = this.findWinPosition(lines,'X');
    const findO = this.findWinPosition(lines,'O');
    if(findO !== null) {
      step = findO;
    }
    else if(findX !== null) {
      step = findX;
    }
    else {
      squares.forEach((el,index)=>{
        if(!el) {
          arrEmpty.push(index);
        }
      });
      step = arrEmpty[Math.floor(Math.random() * arrEmpty.length)];
    }
    

    this.stepPC = setTimeout(()=>{
      squares[step] = this.state.xIsNext ? 'X':'O';
      this.playAudio('step');
      this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext,
      });
      this.disableBoard = false;
    }
    ,1000);
  }

  findWinPosition(lines,figure) {
    for(let i = 0; i < lines.length; i++) { 
      if(lines[i].reduce((acum,el)=>{
        return this.state.squares[el] === figure ? acum + 1 : acum;
       },0) === 2) {
         for(let j = 0; j < lines[i].length; j++) {
           if(this.state.squares[lines[i][j]] === null) {
             return lines[i][j];
           }
         }
       }
    }
    return null;
  }

  changeStatistics(mode,winner) {
    const statistics = getData('statisticsGame') || DEFAULT_STATISTICS;
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
            <input type="radio" name='mode' value='pvspc' defaultChecked={this.state.mode === 'pvspc' ? true : false} onChange={(e)=>this.changeMode(e.target.value)}/>
           Player VS PC
          </label>
          <label className='choose-mode-item'>
            <input type="radio" name='mode' value='pcvpc' defaultChecked={this.state.mode === 'pcvpc' ? true : false} onChange={(e)=>this.changeMode(e.target.value)}/>
           PC VS PC
          </label>
        </div>
        <div className="status">{status}</div>
      <div className={this.state.mode === 'pcvpc' ? 'board-wrap board-wrap--disable' : 'board-wrap'}>
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