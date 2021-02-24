import React from 'react';


function Settings (props){
    return (
      <div>
      <h1>Settings</h1>
      <ul>
        <li>
          <span>Sound:</span>
          <div>
            <label>
              On
              <input type="radio" value='on' name='sound' onChange={props.toggleSound} defaultChecked={props.sound ? true : false}/>
            </label>
            <label>
              Off
              <input type="radio" value='off' name='sound' onChange={props.toggleSound} defaultChecked={props.sound ? false : true}/>
            </label>
          </div>
        </li>
      </ul>
      <button onClick={()=>props.changeLink('menu')}>Menu</button>
      </div>
    );
}

export default Settings;