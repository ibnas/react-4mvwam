import React, { useState } from 'react';
import DraggableCircle from './draggableCircle';
import { DraggableLine } from './DraggableLine';
import './style.css';



export default function Line(props) {

  // let style = {
  //   strokeWidth: 5,
  //   endCircles: true,
  //   lineColor: "",

  // }
  let co = [props.x1, props.y1, props.x2, props.y2,];
  let [coord, setCoord] = useState([...co]);

  let change1 = (state) => {
    setCoord([
      coord[0] + state.dx,
      coord[1] + state.dy,
      coord[2],
      coord[3]
    ]);
  }

  let change2 = (state) => {
    setCoord([
      coord[0],
      coord[1],
      coord[2] + state.dx,
      coord[3] + state.dy,
    ]);
  }

  let change = (state) => {
    setCoord([
      coord[0] + state.dx,
      coord[1] + state.dy,
      coord[2] + state.dx,
      coord[3] + state.dy,
    ]);
  }
  return (

    <>
      <DraggableLine context={props.context} positionChange={change}
        x1={coord[0]}
        y1={coord[1]}
        x2={coord[2]}
        y2={coord[3]}>
      </DraggableLine>
      {/* <Draggable subscribe={props.subscribe}> */}
      <DraggableCircle r={15} x={coord[0]} y={coord[1]} context={props.context} positionChange={change1} > </DraggableCircle>
      <DraggableCircle r={15} x={coord[2]} y={coord[3]} context={props.context} positionChange={change2}> </DraggableCircle>
      {/* </Draggable> */}
    </>
  );
}
