import React from 'react';

function Square (props){
  const style = {
    color: props.colorFigure,
    background: props.colorBoard,
  };
    return (
      <button className="square" style={style} onClick={props.onClick}>
        {props.value}
      </button>
    );
}
export default Square;