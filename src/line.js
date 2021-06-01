import React, { useState } from 'react';
import './style.css';

export default function Line(props) {
  let [coord, setCoord] = useState([0, 0, 100, 100]);

  // props.onDrag = args => {
  //   let co = [
  //     coord[0] + args.dx,
  //     coord[1] + args.dy,
  //     coord[2] + args.dx,
  //     coord[3] + args.dy
  //   ];
  //   this.setCoord(co);
  // };
  let Ln = 'line';
  //
  props.onDrag(dragState => {
    setCoord([
      coord[0] + dragState.dx,
      coord[1] + dragState.dy,
      coord[2] + dragState.dx,
      coord[3] + dragState.dy
    ]);
  });
  return (
    <line
      {...props.events}
      x1={coord[0]}
      y1={coord[1]}
      x2={coord[2]}
      y2={coord[3]}
      style={{ stroke: 'rgb(255,0,0)', 'stroke-width': '24', cursor: 'grab' }}
    />
  );
}
