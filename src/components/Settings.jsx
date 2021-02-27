import React from 'react';


function Settings (props){
    return (
      <div>
      <h1 className='setting-title'>Settings</h1>
      <ul>
        <li className='setting-item'>
          <span className='setting-item-title'>Sound:</span>
          <div>
            <label>
              On
              <input type="radio" value='on' name='sound' onChange={props.toggleSound} defaultChecked={props.settings.sound ? true : false}/>
            </label>
            <label>
              Off
              <input type="radio" value='off' name='sound' onChange={props.toggleSound} defaultChecked={props.settings.sound ? false : true}/>
            </label>
          </div>
        </li>
        <li className='setting-item'>
          <span className='setting-item-title'>Music:</span>
          <div>
            <label>
              On
              <input type="radio" value='on' name='music' onChange={props.toggleMusic} defaultChecked={props.settings.music ? true : false}/>
            </label>
            <label>
              Off
              <input type="radio" value='off' name='music' onChange={props.toggleMusic} defaultChecked={props.settings.music ? false : true}/>
            </label>
          </div>
        </li>
        <li className='setting-item'>
          <span className='setting-item-title'>Color figures:</span>
          <div>
           <input type="color" onChange={(e)=>props.toggleColorFigure(e.target.value)} defaultValue={props.settings.colorFigure}/>
          </div>
        </li>
        <li className='setting-item'>
          <span className='setting-item-title'>Color board:</span>
          <div>
           <input type="color" onChange={(e)=>props.toggleColorBoard(e.target.value)} defaultValue={props.settings.colorBoard}/>
          </div>
        </li>
        <li className='setting-item'>
          <span className='setting-item-title'>Volume Sound:</span>
          <div>
            <input type="range" min="0" max="1" step='0.1' onChange={(e)=>props.toggleVolumeSound(e.target.value)} defaultValue={props.settings.volumeSound}/>
          </div>
        </li>
        <li className='setting-item'>
          <span className='setting-item-title'>Volume Music:</span>
          <div>
            <input type="range" min="0" max="1" step='0.1' onChange={(e)=>props.toggleVolumeMusic(e.target.value)} defaultValue={props.settings.volumeMusic}/>
          </div>
        </li>
        <li className='setting-item'>
          <span className='setting-item-title'>Time for step:</span>
          <div>
            <select value={props.settings.timeForStep} onChange={(e)=>props.toggleTimeForStep(e.target.value)}>
              <option value="2000">2 seconds</option>
              <option value="5000">5 seconds</option>
              <option value="10000">10 seconds</option>
              <option value="infinity">infinity</option>
            </select>
          </div>
        </li>
      </ul>
      <button onClick={()=>props.changeLink('menu')}>Menu</button>
      </div>
    );
}

export default Settings;