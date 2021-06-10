import React, { useState } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './style.css';

export default function Draggable(props) {
  let children = props.children;

  let update = dragstate => {
    props.onDrag ? props.onDrag(dragstate) : false;
  };
  props.updateState ? props.updateState(update) : false;
  return (
    <>
      {React.Children.map(children, child => {
        return (
          <DraggableChild
            context={props.context}
            onDrag={props.onDrag}
            child={child}
            positionChange={props.positionChange}
            listeners={props.listeners}
          />
        ); //;
      })}
    </>
  );
}

let DraggableChild = props => {
  let [mousedown, setMousedown] = useState(false);
  let [dragging, setDragging] = useState(false);
  let [dragState, setDragstate] = useState({});
  let [subscrib, setSubscribe] = useState([]);

  let move = evt => {
    if (dragging) {
      let ds = { ...dragState };
      ds.dx = evt.pageX - dragState.x;
      ds.dy = evt.pageY - dragState.y;
      ds.x = evt.pageX;
      ds.y = evt.pageY;
      dragState.dragObject = id;

      onDrag(ds);
      setDragstate(ds);
      // console.log(ds);
    }
  };
  let id = false;
  let events = {
    onMouseEnter: () => {
      if (list.enter) {
        if (dragging) list.enter(dragState);
        else list.enter(props.context.getDragState());
        //console.log(props.context.getDragState());
      }
    }, //gggrgrgrgr
    onMouseLeave: evt => {
      if (list.leave) {
        if (dragging) list.leave(dragState);
        else list.enter(props.context.getDragState());
      }
      if (dragging) {
        if (props.context.subscribe) {
          let subscribe = props.context.subscribe;
          let unSubscribe = props.context.unSubscribe;
          let moveId = subscrib[0]
            ? subscrib[0]
            : subscribe('onMouseMove', move);
          let leaveId = subscrib[1]
            ? subscrib[1]
            : subscribe('onMouseLeave', () => {
                setMousedown(false);
                stopDrag();
              });
          let upId = subscrib[2]
            ? subscrib[2]
            : subscribe('onMouseUp', () => {
                setMousedown(false);
                stopDrag();
              });

          let stopDrag = () => {
            setDragging(false);
            props.context.setDragState(null);
            id = false;
            unSubscribe('onMouseMove', moveId);
            unSubscribe('onMouseLeave', leaveId);
            unSubscribe('onMouseUp', upId);
            setSubscribe([]);
          };
          setSubscribe([moveId, leaveId, upId]);
        }
      }
      // console.log('mouse leave');
      // console.log(evt);
      // console.log(dragState);
    },
    onMouseMove: evt => {
      if (list.move) {
        if (dragging) list.move(dragState);
        else list.enter(props.context.getDragState());
      }
      if (dragging) {
        move(evt);
      } else if (mousedown) {
        setDragging(true);
        id = props.context.setDragState({ ds: dragState });
        move(evt);
      }
      // console.log(evt);
      // console.log(dragState);
      // console.log('mouse move');
    },
    onMouseUp: () => {
      if (list.up) {
        if (dragging) list.up(dragState);
        else list.enter(props.context.getDragState());
      }
      setMousedown(false);
      setDragging(false);
      props.context.setDragState(null);
      // console.log('mouse released');
      // console.log(dragState);
    },
    onMouseDown: evt => {
      if (list.down) {
        if (dragging) list.down(dragState);
        else list.enter(props.context.getDragState());
      }
      setMousedown(true);
      dragState.x = evt.pageX;
      dragState.y = evt.pageY;
      // console.log('mouse pressed');
      // console.log(dragState);
    }
  };
  let onDrag = props.onDrag ? props.onDrag : () => {};

  let list = {};
  if (props.listeners) {
    list = props.listeners;
  }

  let c = React.cloneElement(props.child, {
    ...events,
    positionChange: props.positionChange,
    setOnDrag: cb => (onDrag = cb)
  });
  return c;
};
