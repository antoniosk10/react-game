import React, { useState } from 'react';
import { getData, setData } from './../localStorageUtil';
import { DEFAULT_STATISTICS } from '../DefaultValues'

function Statistics (props){
  const data = getData('statisticsGame') || DEFAULT_STATISTICS;
  const [, updateStatistics] = useState(data);

  function resetStatistics (){
    setData('statisticsGame',DEFAULT_STATISTICS);
    updateStatistics(DEFAULT_STATISTICS);
  }

    return (
    <div>
        <table>
        <caption><h2>Statistics</h2></caption>
        <thead>
        <tr>
          <th>
            Mode / Figure
          </th>
          <th>
            Player VS Player
          </th>
          <th>
            Player(X) VS PC(O)
          </th>
          <th>
            PC VS PC
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
              X
          </td>
          <td>
              {data.pvp.X}
          </td>
          <td>
              {data.pvspc.X}
          </td>
          <td>
              {data.pcvpc.X}
          </td>
        </tr>
        <tr>
          <td>
              O
          </td>
          <td>
              {data.pvp.O}
          </td>
          <td>
              {data.pvspc.O}
          </td>
          <td>
              {data.pcvpc.O}
          </td>
        </tr>
        <tr>
          <td>
              Draw
          </td>
          <td>
              {data.pvp.draw}
          </td>
          <td>
              {data.pvspc.draw}
          </td>
          <td>
              {data.pcvpc.draw}
          </td>
        </tr>
        </tbody>
     </table>
     <div className='buttons-block'>
          <button onClick={()=>props.changeLink('menu')}>Menu</button>
          <button onClick={()=>resetStatistics()}>Reset statistics</button>
      </div>
    </div>
     
    );
}

export default Statistics;