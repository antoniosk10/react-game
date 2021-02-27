import React from 'react';
import Board from './Board';
import Menu from './Menu';
import Settings from './Settings';
import { getData, setData } from './../localStorageUtil';
import audio from '../assets/sounds/music.mp3';

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      link: 'menu',
      continue:false,
      settings: getData('settingsGame') || {
        sound:true,
        music:false,
        colorFigure:'#000000',
        colorBoard:'#ffffff',
        volumeSound:1,
        volumeMusic:1,
        timeForStep:'infinity'
      }
    }
    this.audio = new Audio(audio);
    this.init();
}

init() {
  this.audio.addEventListener('ended',()=>{
    this.audio.play();
  }); 
}

componentDidUpdate() {
  this.audio.volume = this.state.settings.volumeMusic;
  if(this.state.settings.music) {
    this.audio.play();
  }
  else {
    this.audio.pause();
  }
  setData('settingsGame',this.state.settings);
}

changeLink = (link)=>{
  this.setState({link:link});
}

toggleSound = ()=>{
  this.setState(prevState => ({
    settings: {                   
        ...prevState.settings,   
        sound: !prevState.settings.sound       
    }
}));
}

toggleMusic = ()=>{
  this.setState(prevState => ({
    settings: {                   
        ...prevState.settings,   
        music: !prevState.settings.music       
    }
}));
}

toggleColorFigure = (color)=>{
  this.setState(prevState => ({
    settings: {                   
        ...prevState.settings,   
        colorFigure:color  
    }
}));
}

toggleColorBoard = (color)=>{
  this.setState(prevState => ({
    settings: {                   
        ...prevState.settings,   
        colorBoard:color  
    }
}));
}

toggleVolumeSound = (value)=>{
  this.setState(prevState => ({
    settings: {                   
        ...prevState.settings,   
        volumeSound:value  
    }
}));
}

toggleVolumeMusic = (value)=>{
  this.setState(prevState => ({
    settings: {                   
        ...prevState.settings,   
        volumeMusic:value  
    }
}));
}

toggleTimeForStep = (value)=>{
  this.setState(prevState => ({
    settings: {                   
        ...prevState.settings,   
        timeForStep:value  
    }
}));
}

renderSwitch(link) {
  switch(link) {
    case 'newGame':
      return <Board changeLink={this.changeLink} settings={this.state.settings}/>;
    case 'continue':
      return <Board changeLink={this.changeLink} save={getData('saveGame')} settings={this.state.settings}/>;
    case 'settings':
      return <Settings changeLink={this.changeLink} settings={this.state.settings} toggleSound={this.toggleSound} toggleMusic={this.toggleMusic} toggleColorFigure={this.toggleColorFigure} toggleColorBoard={this.toggleColorBoard} toggleVolumeSound={this.toggleVolumeSound} toggleVolumeMusic={this.toggleVolumeMusic} toggleTimeForStep={this.toggleTimeForStep}/>;
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
