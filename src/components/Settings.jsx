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
        <li>
          <span>Music:</span>
          <div>
            <label>
              On
              <input type="radio" value='on' name='music' onChange={props.toggleMusic} defaultChecked={props.music ? true : false}/>
            </label>
            <label>
              Off
              <input type="radio" value='off' name='music' onChange={props.toggleMusic} defaultChecked={props.music ? false : true}/>
            </label>
          </div>
        </li>
        <li>
          <span>Color figures:</span>
          <div>
           <input type="color" onChange={(e)=>props.toggleColorFigure(e.target.value)} defaultValue={props.colorFigure}/>
          </div>
        </li>
        <li>
          <span>Color board:</span>
          <div>
           <input type="color" onChange={(e)=>props.toggleColorBoard(e.target.value)} defaultValue={props.colorBoard}/>
          </div>
        </li>
      </ul>
      <button onClick={()=>props.changeLink('menu')}>Menu</button>
      </div>
    );
}

export default Settings;