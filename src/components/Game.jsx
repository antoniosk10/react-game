import React from 'react';
import Board from './Board';
import Menu from './Menu';
import {HashRouter, Route, Switch} from 'react-router-dom';

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isMenu: false
    }
    this.handleClick = (link)=>{
      this.setState((st)=>{
          return {...st, isMenu: !st.isMenu}
      })
  }
  
 
}

  render() {
    return (
      <HashRouter>
      <div className="game">
        <div className="game-board">
        <Switch>
          <Route exact path="/">
            <Menu />
          </Route>
          <Route path="/game">
            <Board />
          </Route>
        </Switch>
        </div>
      </div>
      </HashRouter>
    );
  }
}
export default Game;
