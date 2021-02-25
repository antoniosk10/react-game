import React from 'react';
import Board from './Board';
import Menu from './Menu';
import Settings from './Settings';
import { getData } from './../localStorageUtil';
import audio from '../assets/sounds/music.mp3';

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      link: 'menu',
      continue:false,
      sound:true,
      music:false,
      colorFigure:'#000',
      colorBoard:'#fff'
    }
    this.audio = new Audio(audio);
    
}

componentDidUpdate() {
  if(this.state.music) {
    this.audio.currentTime = 0;
    this.audio.play();
  }
  else {
    this.audio.pause();
  }
  
}

changeLink = (link)=>{
  this.setState({link:link});
}

toggleSound = ()=>{
  this.setState((state)=>({sound:!state.sound}));
}

toggleMusic = ()=>{
  this.setState((state)=>({music:!state.music}));
}

toggleColorFigure = (color)=>{
  this.setState({colorFigure:color});
}

toggleColorBoard = (color)=>{
  this.setState({colorBoard:color});
}

renderSwitch(link) {
  switch(link) {
    case 'newGame':
      return <Board changeLink={this.changeLink} sound={this.state.sound} colorFigure={this.state.colorFigure} colorBoard={this.state.colorBoard}/>;
    case 'continue':
      return <Board changeLink={this.changeLink} save={getData('saveGame')} sound={this.state.sound} colorFigure={this.state.colorFigure} colorBoard={this.state.colorBoard}/>;
    case 'settings':
      return <Settings changeLink={this.changeLink} toggleSound={this.toggleSound} sound={this.state.sound} toggleMusic={this.toggleMusic} music={this.state.music} colorFigure={this.state.colorFigure} toggleColorFigure={this.toggleColorFigure} colorBoard={this.state.colorBoard} toggleColorBoard={this.toggleColorBoard}/>;
    case 'menu':
      return <Menu changeLink={this.changeLink}/>;
    default:
      return null;
  }
}

  render() {

    return (
      <div className="game">
        <div className="game-board">
          {this.renderSwitch(this.state.link)}
        </div>
      </div>
    );
  }
}
export default Game;
