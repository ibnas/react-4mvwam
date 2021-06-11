import React, { useState } from 'react';
import './style.css';

export default function Dragzone(props) {
  let events = {
    onMouseEnter: () => { },
    onMouseLeave: evt => {
      call(evt, callbacks.onMouseLeave);
      // console.log('sub mouse leave');
      // console.log(evt);
    },
    onMouseMove: evt => {
      call(evt, callbacks.onMouseMove);
      // console.log('sub mouse move');
      // console.log(evt);
    },
    onMouseUp: evt => {
      call(evt, callbacks.onMouseUp);
      // console.log('sub mouse up');
      // console.log(evt);
    },
    onMouseDown: () => { },
  };
  let subscribe = (name, callback, id) => {
    // console.log("subs");

    //let id = '#' + Math.round(Math.random() * 10000);
    callbacks[name][id] = callback;
    return id;
  };

  let unSubscribe = (name, id) => {
    delete callbacks[name][id];
  }
  let callbacks = {
    onMouseEnter: {},
    onMouseLeave: {},
    onMouseMove: {},
    onMouseUp: {},
    onMouseDown: {}
  };

  let call = (evt, obj) => {
    for (let i in obj) {
      obj[i](evt);
    }
  };

  let children = props.children;
  let Comp = props.component;
  let [dragState, setDragState] = useState(false);
  let setDs = (ds) => {
    if (ds === null) return;
    const newLocal = '#' + Math.round(Math.random() * 10000);
    ds.id = newLocal;
    setDragState(ds);
    return newLocal;
  };
  let r = (
    <Comp {...events}>
      {React.Children.map(children, child => {
        child = React.cloneElement(child, { context: { subscribe: subscribe, unSubscribe: unSubscribe, setDragState: setDs, getDragState: () => { return dragState } } });
        return child;
      })}
    </Comp>
  );

  return r;



  // return (
  //   <>
  //     {React.Children.map(children, child => {
  //       child = React.cloneElement(child, {dragZone:this,  events: events,});
  //       return child; //;
  //     })}
  //   </>
  // );
}
