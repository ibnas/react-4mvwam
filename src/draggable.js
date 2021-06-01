import React, { useState } from 'react';
import './style.css';

export default function Draggable(props) {
  let [coord, setCoord] = useState([0, 0, 100, 100]);
  let events = {
    onMouseEnter: () => console.log('mouse enter'),
    onMouseLeave: () => console.log('mouse leave'),
    onMouseMove: () => console.log('mouse move'),
    onMouseUp: () => console.log('mouse released'),
    onMouseDown: () => console.log('mouse pressed')
  };

  let children = props.children;
  return (
    <>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { ...events });
      })}
    </>
  );
}
