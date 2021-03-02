import React from 'react';


function ButtonKeyboard (props){
    return (
      <div className="button-keyboard">
        <span className="mark-keyboard">{props.mark}</span>
        <span className="value-keyboard">{props.value}</span>
      </div>
    );
}

export default ButtonKeyboard;