import React, { useState } from 'react';
import './style.css';

export default function Draggable(props) {
  let [coord, setCoord] = useState({ x: 0, y: 0 });
  let [mousedown, setMousedown] = useState(false);
  let [dragging, setDragging] = useState(false);
  let dragState = {};

  let move = evt => {
    if (dragging) {
      dragState.dx = evt.pageX - dragState.x;
      dragState.dy = evt.pageY - dragState.y;
      dragState.x = evt.pageX;
      dragState.y = evt.pageY;
      onDrag(dragState);
    }
  };

  let events = {
    onMouseEnter: () => console.log('mouse enter'),
    onMouseLeave: evt => {
      if (dragging) {
        dragState.dx = evt.pageX - dragState.x;
        dragState.dy = evt.pageY - dragState.y;
        dragState.x = evt.pageX;
        dragState.y = evt.pageY;

        props.dragZone.addMouseListener('mousemove', move);
        props.dragZone.addMouseListener('mouseleave', () => {
          setDragging(false);
        });
        props.dragZone.addMouseListener('mouseup', () => {
          setDragging(false);
        });

        onDrag(dragState);
      }
      console.log('mouse leave');
      console.log(evt);
      console.log(dragState);
    },
    onMouseMove: evt => {
      if (dragging) {
        dragState.dx = evt.movementX;
        dragState.dy = evt.movementY;
        dragState.x = evt.pageX;
        dragState.y = evt.pageY;

        onDrag(dragState);
      } else if (mousedown) {
        setDragging(true);
        dragState.dx = evt.movementX;
        dragState.dy = evt.movementY;
        dragState.x = evt.pageX;
        dragState.y = evt.pageY;
        onDrag(dragState);
      }
      console.log(evt);
    },
    onMouseUp: () => {
      setMousedown(false);
      setDragging(false);

      if (dragging) {
      }
      console.log('mouse released');
    },
    onMouseDown: () => {
      setMousedown(true);
      console.log('mouse pressed');
    }
  };
  let onDrag = () => {}; //callBack => callBack(dragState)
  let children = props.children;
  return (
    <>
      {React.Children.map(children, child => {
        //child.props = {...child.props, ...events};
        //for(let i in events) child.props[i] = events[i];

        child = React.cloneElement(child, {
          events: events,
          onDrag: cb => (onDrag = cb)
        });
        return child; //;
      })}
    </>
  );
}
