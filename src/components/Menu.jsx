import React from 'react';
import { getData } from './../localStorageUtil';

function Menu (props){
    return (
      <ul className='menu'>
        <li className='menu-item' onClick={()=>props.handler('newGame')}>
          New Game
        </li>
        <li className={getData('saveGame') ? 'menu-item': 'menu-item menu-item--disabled'} onClick={()=>props.handler('continue')}>
          Continue
        </li>
        <li className='menu-item'>
          Settings
        </li>
      </ul>
    );
}

export default Menu;