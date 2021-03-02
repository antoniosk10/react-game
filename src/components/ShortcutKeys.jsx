import React from 'react';
import ButtonKeyboard from './ButtonKeyboard';

function ShortcutKeys (props){
    return (
      <div>
      <h1>Shortcut Keys</h1>
      <ul className="shortcut-list">
        <li className="shortcut-item">
          <span>New Game</span>
          <ButtonKeyboard mark='!' value='1'/>
        </li>
        <li className="shortcut-item">
          <span>Continue</span>
          <ButtonKeyboard mark='@' value='2'/>
        </li>
        <li className="shortcut-item">
          <span>Settings</span>
          <ButtonKeyboard mark='#' value='3'/>
        </li>
        <li className="shortcut-item">
          <span>Statistics</span>
          <ButtonKeyboard mark='$' value='4'/>
        </li>
        <li className="shortcut-item">
          <span>Shortcut keys</span>
          <ButtonKeyboard mark='%' value='5'/>
        </li>
        <li className="shortcut-item">
          <span>Menu</span>
          <ButtonKeyboard mark='' value='Backspace'/>
        </li>
      </ul>
      <button onClick={()=>props.changeLink('menu')}>Menu</button>
      </div>
    );
}

export default ShortcutKeys;