import React, { useState } from 'react';
import './style.css';

export default function Dragzone(props) {
  let events = {
    onMouseEnter: () => console.log('mouse enter'),
    onMouseLeave: evt => {
      call(evt, callbacks.onMouseLeave);
      console.log('sub mouse enter');
      // console.log(evt);
    },
    onMouseMove: evt => {
      call(evt, callbacks.onMouseMove);
      console.log('sub mouse move');
      // console.log(evt);
    },
    onMouseUp: evt => {
      call(evt, callbacks.onMouseUp);
      console.log('sub mouse up');
      // console.log(evt);
    },
    onMouseDown: () => console.log('mouse pressed'),
  };
  let subscribe = (name, callback) => {
    console.log("subs");

    let id = '#' + Math.round(Math.random() * 10000);
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
  let dragState = false;
  let r = (
    <Comp {...events}>
      {React.Children.map(children, child => {
        child = React.cloneElement(child, { context: { subscribe: subscribe, unSubscribe: unSubscribe, setDragState: (ds) => { dragState = ds }, getDragState: () => dragState } });
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
