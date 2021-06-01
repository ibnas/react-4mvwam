import React, { useState } from 'react';
import './style.css';

export default function Draggable(props) {
  let [coord, setCoord] = useState({ x: 0, y: 0 });
  let [mousedown, setMousedown] = useState(false);
  let [dragging, setDragging] = useState(false);

  let events = {
    onMouseEnter: () => console.log('mouse enter'),
    onMouseLeave: () => console.log('mouse leave'),
    onMouseMove: evt => {
      if (mousedown) {
        setDragging(true);
      }
      setCoord({ x: evt.x, y: evt.y });
      console.log('mouse move');
    },
    onMouseUp: () => {
      setMousedown(false);
      console.log('mouse released');
    },
    onMouseDown: () => {
      setMousedown(true);
      console.log('mouse pressed');
    },
    onDrag: () => console.log('mouse dragged'),
    dragState: {}
  };

  let children = props.children;
  return (
    <>
      {React.Children.map(children, child => {
        //child.props = {...child.props, ...events};
        //for(let i in events) child.props[i] = events[i];

        child = React.cloneElement(child, { events: events });
        return child; //;
      })}
    </>
  );
}
