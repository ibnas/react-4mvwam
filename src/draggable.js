import React, { useState } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './style.css';

export default function Draggable(props) {
  let [mousedown, setMousedown] = useState(false);
  let [dragging, setDragging] = useState(false);
  let [dragState, setDragstate] = useState({});
  let [subscrib, setSubscribe] = useState([]);

  let move = evt => {
    if (dragging) {
      let ds = { ...dragState }
      ds.dx = evt.pageX - dragState.x;
      ds.dy = evt.pageY - dragState.y;
      ds.x = evt.pageX;
      ds.y = evt.pageY;
      onDrag(ds);
      setDragstate(ds);
      console.log(ds);

    }
  };
  let subscribed = false;
  let events = {
    onMouseEnter: () => {
      // if (subscribed) {
      //   setMousedown(true);
      //   setDragging(true);
      // }
      console.log('mouse enter');

    },
    onMouseLeave: evt => {
      if (dragging) {

        if (props.subscribe) {
          let subscribe = props.subscribe.subscribe;
          let unSubscribe = props.subscribe.unSubscribe;
          let moveId = (subscrib[0]) ? subscrib[0] : subscribe('onMouseMove', move);
          let leaveId = (subscrib[1]) ? subscrib[1] : subscribe('onMouseLeave', () => {
            setMousedown(false);
            stopDrag();
          });
          let upId = (subscrib[2]) ? subscrib[2] : subscribe('onMouseUp', () => {
            setMousedown(false);
            stopDrag();
          });

          let stopDrag = () => {
            setDragging(false);
            unSubscribe('onMouseMove', moveId);
            unSubscribe('onMouseLeave', leaveId);
            unSubscribe('onMouseUp', upId);
            setSubscribe([]);

          }

          setSubscribe([moveId, leaveId, upId]);
        }
      }
      console.log('mouse leave');
      // console.log(evt);
      // console.log(dragState);
    },
    onMouseMove: evt => {
      if (dragging) {
        move(evt);
      } else if (mousedown) {
        setDragging(true);
        move(evt);
      }
      evt.preventDefault();
      // console.log(evt);
      // console.log(dragState);
      console.log('mouse move');

    },
    onMouseUp: () => {
      setMousedown(false);
      setDragging(false);

      console.log('mouse released');
      // console.log(dragState);
    },
    onMouseDown: evt => {
      setMousedown(true);
      dragState.x = evt.pageX;
      dragState.y = evt.pageY;
      console.log('mouse pressed');
      // console.log(dragState);
    }
  };
  let onDrag = () => { }; //callBack => callBack(dragState)
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
