import React from 'react';
import Board from './Board';
import Menu from './Menu';
import Settings from './Settings';
import ShortcutKeys from './ShortcutKeys';
import Statistics from './Statistics';
import { getData, setData } from './../localStorageUtil';
import audio from '../assets/sounds/music.mp3';
import logo from './../assets/image/rss.svg'

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
  document.addEventListener('keyup',(e)=>{
    switch(e.key) {
      case 'Backspace' : {
        this.changeLink('menu');
        break;
      }
      case '1' : {
        this.changeLink('newGame');
        break;
      }
      case '2' : {
        if(this.state.continue) {
          this.changeLink('continue');
        }
        break;
      }
      case '3' : {
        this.changeLink('settings');
        break;
      }
      case '4' : {
        this.changeLink('statistics');
        break;
      }
      case '5' : {
        this.changeLink('shortcutKeys');
        break;
      }
      default : break;
    }
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
    case 'statistics':
        return <Statistics changeLink={this.changeLink}/>;
    case 'shortcutKeys':
        return <ShortcutKeys changeLink={this.changeLink}/>;
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
        <footer>
         <p>Created by <a href="https://github.com/antoniosk10">Anton Skorobogaty</a> / 03.03.2021</p>
         <a href="https://rs.school/react/" className='logo'><img src={logo} alt="rss"/></a>
        </footer>
      </div>
    );
  }
}
export default Game;
