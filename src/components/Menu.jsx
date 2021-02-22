import React from 'react';
import {NavLink} from 'react-router-dom';

function Menu (props){
    return (
      <ul className='menu'>
        <li className='menu-item'>
          <NavLink to="/game">New Game</NavLink>
        </li>
        <li className='menu-item'>
          Continue
        </li>
        <li className='menu-item'>
          Save Game
        </li>
        <li className='menu-item'>
          Settings
        </li>
      </ul>
    );
}

export default Menu;