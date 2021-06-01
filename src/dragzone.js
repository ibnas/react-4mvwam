import React, { useState } from 'react';
import './style.css';

export default function Dragzone(props) {
  let [coord, setCoord] = useState([0, 0, 100, 100]);
  let events = {
    onMouseEnter: () => console.log('mouse enter'),
    onMouseLeave: () => console.log('mouse leave'),
    onMouseMove: () => console.log('mouse move'),
    onMouseUp: () => console.log('mouse released'),
    onMouseDown: () => console.log('mouse pressed'),
    onDrag: () => console.log('mouse dragged'),
    draggable:"true"
  };

  let children = props.children;
  return (
    <>
      {React.Children.map(children, child => {
        child = React.cloneElement(child, {events:events});
        return child; //;
      })}
    </>
  );
}