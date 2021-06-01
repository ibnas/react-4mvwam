import React, { useState } from 'react';
import './style.css';

export default function Draggable(props) {
  let [coord, setCoord] = useState({ x: 0, y: 0 });
  let [mousedown, setMousedown] = useState(false);
  let [dragging, setDragging] = useState(false);
  let [dragState, setDragstate] = useState({});

  let move = evt => {
    if (dragging) {
      dragState.dx = evt.pageX - dragState.x;
      dragState.dy = evt.pageY - dragState.y;
      dragState.x = evt.pageX;
      dragState.y = evt.pageY;
      setDragging(dragState);
      onDrag(dragState);
    }
  };
  let subscribed = false;
  let mL = () => {};
  let events = {
    onMouseEnter: () => {
      if (subscribed) {
        setMousedown(true);
        setDragging(true);
      }
    },
    onMouseLeave: evt => {
      if (dragging) {
        if (props.subscribe) {
          props.subscribe('onMouseMove', move);
          props.subscribe('onMouseLeave', () => {
            setMousedown(false);
            setDragging(false);
          });
          props.subscribe('onMouseUp', () => {
            setMousedown(false);
            setDragging(false);
          });
        }
      }
      console.log('mouse leave');
      console.log(evt);
      console.log(dragState);
    },
    onMouseMove: evt => {
      if (dragging) {
        move(evt);
      } else if (mousedown) {
        setDragging(true);
        move(evt);
      }
      console.log(evt);
      console.log(dragState);
    },
    onMouseUp: () => {
      setMousedown(false);
      setDragging(false);

      console.log('mouse released');
      console.log(dragState);
    },
    onMouseDown: evt => {
      setMousedown(true);
      dragState.x = evt.pageX;
      dragState.y = evt.pageY;
      console.log('mouse pressed');
      console.log(dragState);
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
