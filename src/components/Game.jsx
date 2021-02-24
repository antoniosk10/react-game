import React from 'react';
import Board from './Board';
import Menu from './Menu';
import Settings from './Settings';
import { getData } from './../localStorageUtil';

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      link: 'menu',
      continue:false,
      sound:true
    }
    this.changeLink = this.changeLink.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
}

changeLink = (link)=>{
  this.setState({link:link});
}

toggleSound = ()=>{
  this.setState((state)=>({sound:!state.sound}));
}

renderSwitch(link) {
  switch(link) {
    case 'newGame':
      return <Board changeLink={this.changeLink} sound={this.state.sound}/>;
    case 'continue':
      return <Board changeLink={this.changeLink} save={getData('saveGame')} sound={this.state.sound}/>;
    case 'settings':
      return <Settings changeLink={this.changeLink} toggleSound={this.toggleSound} sound={this.state.sound}/>;
    case 'menu':
      return <Menu changeLink={this.changeLink}/>;
    default:
      return null;
  }
}

  render() {
    console.log(this.state.sound);
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
