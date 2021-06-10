import React, { useState } from 'react';
import Draggable from './../draggable';

function Text(props) {
  let [editing, setTediting] = useState(false);
  let [text, setText] = useState('Text');
  let [coor, setCoord] = useState([20, 35]);

  let onDrg = dragState => {
    setCoord([coor[0] + dragState.dx, coor[1] + dragState.dy]);
    //positionChange(dragState);
  };

  let onClick = () => {
    setTediting(!editing);
  };
  let r = !editing ? (
    <point x={coor[0]} y={coor[1]} onDoubleClick={onClick}>
      {text}
    </point>
  ) : (
    <foreignObject
      x={coor[0]}
      y={coor[1]}
      width={100}
      height={100}
      onDoubleClick={onClick}
    >
      <textarea>{text}</textarea>
    </foreignObject>
  );
  return (
    <Draggable context={props.context} onDrag={onDrg}>
      {r}
    </Draggable>
  );
}

export default Text;
