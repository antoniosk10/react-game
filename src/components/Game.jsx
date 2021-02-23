import React from 'react';
import Board from './Board';
import Menu from './Menu';
import { getData } from './../localStorageUtil';

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isMenu: true,
      continue:false
    }
    this.handleClick = (link)=>{
      if(link === 'newGame') {
        this.setState((st)=>{
          return {
            isMenu: false,
            continue:false
          }
      })
      }
      else if(link === 'continue') {
        this.setState((st)=>{
          return {
            isMenu: false,
            continue:true
          }
      })
      }
      else if(link === 'menu') {
        this.setState((st)=>{
          return {
            isMenu: true,
            continue:false
          }
      })
      }
      
  }
  
 
}

  render() {
    
    return (
      
      <div className="game">
        <div className="game-board">

       {this.state.isMenu ? <Menu handler={this.handleClick}/> : this.state.continue ? <Board handler={this.handleClick} save={getData('saveGame')}/> : <Board handler={this.handleClick}/>}
            
        </div>
      </div>
      

    );
  }
}
export default Game;
